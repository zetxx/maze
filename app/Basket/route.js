const Joi = require('joi')
const transaction = require('../Transaction/model')
const basket = require('../Basket/model')
const maze = require('../Management/Maze/model')
const product = require('../Management/Product/model')
maze.belongsTo(product)
transaction.belongsTo(maze)
transaction.belongsTo(basket)

module.exports = function(registrar) {
  registrar({
    method: 'POST',
    path: '/api/basket/fill',
    config: {
      handler: function (req, resp) {
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
                model: maze,
                as: 'maze',
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
          mazeId: Joi.number().min(1).required().description('Maze Id'),
          quantity: Joi.number().min(1).required().description('Quantity bought'),
          basketId: Joi.number().min(1).description('Basket group')
        }
      }
    }
  })
}
