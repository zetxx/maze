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

        if (!req.payload.basketId) {
          b = basket.create({name: '---'})
        } else {
          b = basket
            .findAll({where: {id: req.payload.basketId}})
            .then((r) => (r[0]))
        }
        b
          .then((r) => {
            return maze.find({include: [ product ], where: {id: req.payload.mazeId}})
          })
          .then((r) => {
            console.log(r)
          })
          .then((r) => {
            req.payload.basketId = r.dataValues.id
            response = {basket: r.dataValues}
          })
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
