const Joi = require('joi')
const transaction = require('./models/transaction')
const basket = require('./models/basket')
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
        } else { // get basked info
          b = basket
            .find({where: {id: req.payload.basketId}})
            .then((r) => (r[0]))
        }
        // push basket info into results
        b.then((r) => {
          rq.basketId = r.dataValues.id
        })

        b
          .then(() => (transaction.create(rq)))
          .then((r) => {
            return transaction.find({
              where: {id: r.dataValues.id},
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
