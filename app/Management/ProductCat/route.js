const Joi = require('joi')
const entity = require('./model.js')

module.exports = function(registrar) {
  registrar({
    method: 'POST',
    path: '/api/productCategory',
    config: {
      handler: function (req, resp) {
        entity
          .create(req.payload)
          .then(resp)
      },
      description: 'Add Poo event',
      notes: 'Adds a product category',
      tags: ['api', 'add', 'product category'],
      validate: {
        payload: {
          date: Joi.number().required().description('Date from that event took place')
        }
      }
    }
  })

  registrar({
    method: 'GET',
    path: '/api/productCategory',
    config: {
      handler: function (req, resp) {
        entity
          .findAll({})
          .then(resp)
          .catch((err) => {
            console.error(err)
            resp(err)
          })
      },
      description: 'List product categories',
      notes: 'List product categories',
      tags: ['api', 'get', 'product category']
    }
  })
}
