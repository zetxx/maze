const Joi = require('joi')
const transaction = require('./models/transaction')
const basket = require('./models/basket')
const maze = require('../Management/Maze/model')
const product = require('../Management/Product/model')

module.exports = function(registrar) {
  registrar({
    method: 'POST',
    path: '/api/basket/fill',
    config: {
      handler: function (req, resp) {
        var b, response

        // prepare basket
        if (!req.payload.basketId) { // create basket or
          b = basket.create({name: '---'})
        } else { // get basked info
          b = basket
            .findAll({where: {id: req.payload.basketId}})
            .then((r) => (r[0]))
        }
        // push basket info into results
        b.then((r) => {
          response = {basket: r.dataValues}
        })
        // find maze record
        // find product record based on maze reocrd
        b
          .then((r) => {
            return maze.find({where: {id: req.payload.mazeId}})
          })
          .then((r) => {
            response.maze = r.dataValues
            return r.dataValues
          })
          .then((r) => {
            return product.find({where: {id: response.maze.productId}})
          })
          .then((r) => {
            response.product = r.dataValues
            req.payload.productId = response.maze.productId
            return r.dataValues
          })
          // add product with quantity and price to transaction
          .then(() => (transaction.create(req.payload)))
          .then((r) => {
            response.product = r.dataValues
            return response
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
