const Joi = require('joi')
const preHandlers = require('../preHandlers')
const transaction = require('../Transaction/model')
const basket = require('../Basket/model')
const quantityType = require('../Manage/QuantityType/model')
const repository = require('../Manage/Repository/model')
const product = require('../Manage/Product/model')
const sequelize = require('../../config/db')
const backendHelpers = require('../backendHelpers')
transaction.belongsTo(repository)
transaction.belongsTo(basket)
product.belongsTo(quantityType)
repository.belongsTo(product)

module.exports = (registrar) => {
  registrar({
    method: 'POST',
    path: '/api/baskets/fill',
    config: {
      pre: preHandlers,
      handler: (req, resp) => {
        var pc = backendHelpers.priceCalc(backendHelpers.priceRuleExtract(req.pre.user.priceRuleGroups))
        var b, rq
        rq = Object.assign({}, req.payload)

        // prepare basket
        if (!req.payload.basketId) { // create basket or
          b = basket.create({name: '---'})
            .then((r) => {
              rq.basketId = r.dataValues.id
              return r
            })
            .then(() => {
              return transaction.create(rq)
            })
        } else {
          b = transaction
            .update({quantity: sequelize.literal(`quantity +${parseInt(rq.quantity)}`)}, {where: {basketId: rq.basketId, repositoryId: rq.repositoryId}})
            .then((r) => {
              if (r[0] > 0) {
                return transaction
                  .find({where: {basketId: rq.basketId, repositoryId: rq.repositoryId}, attributes: ['quantity']})
                  .then((r) => {
                    if (r.dataValues.quantity <= 0) {
                      return transaction.destroy({where: {basketId: rq.basketId, repositoryId: rq.repositoryId}})
                    }
                    return true
                  })
              } else {
                return transaction.create(rq)
              }
            })
        }

        b
          .then((r) => {
            return transaction.findAll({
              attributes: ['id', 'quantity'],
              where: {basketId: rq.basketId},
              include: [{
                attributes: ['id', 'quantity'],
                model: repository,
                as: 'repository',
                include: [{
                  attributes: ['id', 'price', 'name'],
                  model: product,
                  as: 'product',
                  include: [{
                    attributes: ['label'],
                    model: quantityType,
                    as: 'quantityType'
                  }]
                }]
              }, {
                attributes: ['id', 'name'],
                model: basket,
                as: 'basket'
              }]
            })
          })
          .then((v) => {
            return v.map((item) => {
              item.repository.product.price = pc(item.repository.product.price)
              return item
            })
          })
          .then(resp)
          .catch((e) => {
            console.error(e)
            resp(e)
          })
      },
      description: 'Add product to basket',
      notes: 'Adds a product to basket',
      tags: ['api', 'add', 'product basket'],
      validate: {
        payload: {
          repositoryId: Joi.number().min(1).required().description('repository Id'),
          quantity: Joi.number().precision(5).required().description('Quantity bought'),
          basketId: Joi.number().min(1).description('Basket group')
        }
      }
    }
  })

  registrar({
    method: 'GET',
    path: '/api/baskets/{basketId}',
    config: {
      pre: preHandlers,
      handler: (req, resp) => {
        var pc = backendHelpers.priceCalc(backendHelpers.priceRuleExtract(req.pre.user.priceRuleGroups))
        transaction.findAll({
          attributes: ['id', 'quantity'],
          where: {basketId: req.params.basketId},
          include: [{
            attributes: ['id', 'quantity'],
            model: repository,
            as: 'repository',
            include: [{
              attributes: ['id', 'price', 'name'],
              model: product,
              as: 'product',
              include: [{
                attributes: ['label'],
                model: quantityType,
                as: 'quantityType'
              }]
            }]
          }, {
            attributes: ['id', 'name'],
            model: basket,
            where: {closed: false},
            as: 'basket'
          }]
        })
          .then((v) => {
            return v.map((item) => {
              item.repository.product.price = pc(item.repository.product.price)
              return item
            })
          })
          .then(resp)
          .catch((e) => {
            console.error(e)
            resp(e)
          })
      },
      description: 'Get basket',
      notes: 'Get basket',
      tags: ['api', 'get', 'product basket'],
      validate: {
        params: {
          basketId: Joi.number().min(1).required().description('Basket Id')
        }
      }
    }
  })

  registrar({
    method: 'DELETE',
    path: '/api/baskets',
    config: {
      pre: preHandlers,
      handler: (req, resp) => {
        sequelize.transaction((t) => {
          return transaction.findAll({
            attributes: ['quantity', 'repositoryId'],
            where: {basketId: req.payload.basketId}
          }, {transaction: t})
            .then((r) => {
              return r.reduce((a, cur) => {
                if (!a) {
                  return repository.update({quantity: sequelize.literal(`quantity - ${parseInt(cur.quantity)}`)}, {where: {id: cur.repositoryId}, transaction: t})
                } else {
                  return a.then(() => repository.update({quantity: sequelize.literal(`quantity - ${parseInt(cur.quantity)}`)}, {where: {id: cur.repositoryId}, transaction: t}))
                }
              }, false)
            })
        })
          .then((tr) => {
            return basket
              .update({closed: 1}, {where: {id: req.payload.basketId}})
              .then(() => ({id: req.payload.basketId}))
          })
          .then(resp)
          .catch((e) => {
            console.error(e)
            resp(e)
          })
      },
      description: 'set basket as paid/closed',
      notes: 'set basket as paid/closed',
      tags: ['api', 'get', 'product basket'],
      validate: {
        payload: {
          basketId: Joi.number().min(1).description('Basket group')
        }
      }
    }
  })

  registrar({
    method: 'POST',
    path: '/api/baskets/reassign',
    config: {
      pre: preHandlers,
      handler: (req, resp) => {
        transaction
          .update({basketId: req.payload.to}, {where: {basketId: req.payload.from}})
          .then(() => {
            basket.update({closed: 1}, {where: {id: req.payload.from}})
            return {to: req.payload.to}
          })
          .then(resp)
          .catch((e) => {
            console.error(e)
            resp(e)
          })
      },
      description: 'basket reassign',
      notes: 'basket reassign',
      tags: ['api', 'get', 'basket reassign'],
      validate: {
        payload: {
          from: Joi.number().min(1).description('Basket id from group'),
          to: Joi.number().min(1).description('Basket id to group')
        }
      }
    }
  })
}
