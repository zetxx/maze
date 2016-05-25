const Joi = require('joi')
const transaction = require('../Transaction/model')
const basket = require('../Basket/model')
const repository = require('../Management/Repository/model')
const product = require('../Management/Product/model')
repository.belongsTo(product)
transaction.belongsTo(repository)
transaction.belongsTo(basket)

module.exports = (registrar) => {
  registrar({
    method: 'POST',
    path: '/api/basket/fill',
    config: {
      handler: (req, resp) => {
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
          b = transaction.create(rq)
        }

        b
          .then((r) => {
            return transaction.findAll({
              where: {basketId: rq.basketId},
              include: [{
                model: repository,
                as: 'repository',
                include: [{
                  model: product,
                  as: 'product'
                }]
              }, {
                model: basket,
                as: 'basket'
              }]
            })
          })
          .then(resp)
      },
      description: 'Add product to basket',
      notes: 'Adds a product to basket',
      tags: ['api', 'add', 'product basket'],
      validate: {
        payload: {
          repositoryId: Joi.number().min(1).required().description('repository Id'),
          quantity: Joi.number().min(1).required().description('Quantity bought'),
          basketId: Joi.number().min(1).description('Basket group')
        }
      }
    }
  })

  registrar({
    method: 'GET',
    path: '/api/basket/{basketId}',
    config: {
      handler: (req, resp) => {
        transaction.findAll({
          where: {basketId: req.params.basketId},
          include: [{
            model: repository,
            as: 'repository',
            include: [{
              model: product,
              as: 'product'
            }]
          }, {
            model: basket,
            as: 'basket',
            where: {closed: 0}
          }]
        })
        .then(resp)
      },
      description: 'Get basket',
      notes: 'Get basket',
      tags: ['api', 'get', 'product basket']
    }
  })

  registrar({
    method: 'DELETE',
    path: '/api/basket',
    config: {
      handler: (req, resp) => {
        basket
        .update({closed: 1}, {where: {id: req.payload.basketId}})
        .then(() => ({id: req.payload.basketId}))
        .then(resp)
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
    path: '/api/basket/reassign',
    config: {
      handler: (req, resp) => {
        transaction
        .update({basketId: req.payload.to}, {where: {basketId: req.payload.from}})
        .then(() => {
          basket.update({closed: 1}, {where: {id: req.payload.from}})
          return {to: req.payload.basketId}
        })
        .then(resp)
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
