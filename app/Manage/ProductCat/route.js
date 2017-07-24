const Joi = require('joi')
const entity = require('./model.js')

module.exports = function(registrar) {
  registrar({
    method: 'POST',
    path: '/api/productCategories',
    config: {
      handler: function (req, resp) {
        entity
          .create(req.payload)
          .then(resp)
      },
      description: 'Add product category',
      notes: 'Adds a product category',
      tags: ['api', 'add', 'product category'],
      validate: {
        payload: {
          name: Joi.string().required().description('Category name')
        }
      }
    }
  })

  registrar({
    method: 'GET',
    path: '/api/productCategories',
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
