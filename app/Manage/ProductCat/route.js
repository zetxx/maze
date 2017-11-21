const Joi = require('joi')
const entity = require('./model.js')
const preHandlers = require('../../preHandlers')
const sequelize = require('../../../config/db')

module.exports = function(registrar) {
  registrar({
    method: 'POST',
    path: '/api/productCategories',
    config: {
      pre: preHandlers,
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
      pre: preHandlers,
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

  registrar({
    method: 'DELETE',
    path: '/api/productCategories/{productCategoryId}',
    config: {
      pre: preHandlers,
      handler: function (req, resp) {
        entity
          .update({enabled: sequelize.literal('!enabled')}, {
            where: {id: req.params.productCategoryId}
          })
          .then(resp)
          .catch((e) => {
            console.error(e)
            resp(e)
          })
      },
      description: 'Disable product category',
      notes: 'Disable product category',
      tags: ['api', 'disable', 'product', 'category'],
      validate: {
        params: {
          productCategoryId: Joi.number().min(1).required().description('Product Category Id')
        }
      }
    }
  })
}
