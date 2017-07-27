const Joi = require('joi')
const preHandlers = require('../../preHandlers')
const product = require('./model.js')
const repository = require('../Repository/model')
const quantityType = require('../QuantityType/model')
const productCategories = require('../ProductCat/model')
const sequelize = require('../../../config/db')

product.hasOne(repository, {foreignKey : 'productId'})
product.belongsTo(quantityType, {foreignKey : 'quantityTypeId'})
product.belongsTo(productCategories, {foreignKey : 'category'})
repository.hasOne(product)

module.exports = function(registrar) {
  registrar({
    method: 'POST',
    path: '/api/products',
    config: {
      pre: preHandlers,
      handler: function (req, resp) {
        product
          .create(req.payload)
          .then(resp)
          .catch((e) => {
            console.error(e)
            resp(e)
          })
      },
      description: 'Add Product',
      notes: 'Adds a product category',
      tags: ['api', 'add', 'product'],
      validate: {
        payload: {
          name: Joi.string().required().description('Product name'),
          barcode: Joi.number().min(3).description('Product Bar code'),
          description: Joi.string().required().description('Product description'),
          category: Joi.number().min(1).required().description('Product category'),
          supplier: Joi.number().min(1).required().description('Supplier'),
          quantityTypeId: Joi.number().min(1).required().description('one of: piece or weight'),
          price: Joi.string().regex(/[\d]+\.[\d]{2,2}/).required().description('Product Price')
        }
      }
    }
  })

  registrar({
    method: 'GET',
    path: '/api/products',
    config: {
      pre: preHandlers,
      handler: function (req, resp) {
        product.findAll({
          attributes: ['id', 'name', 'price'],
          include: [{
            attributes: ['quantity'],
            model: repository
          }, {
            model: quantityType
          }, {
            model: productCategories
          }],
          group: 'products.id'
        })
          .then(resp)
          .catch((e) => {
            console.error(e)
            resp(e)
          })
      },
      description: 'List products',
      notes: 'List products',
      tags: ['api', 'get', 'product']
    }
  })
}
