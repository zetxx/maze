const Joi = require('joi')
const entity = require('./model.js')
const sequelize = require('../../../config/db')

module.exports = function(registrar) {
  registrar({
    method: 'POST',
    path: '/api/product',
    config: {
      handler: function (req, resp) {
        entity
          .create(req.payload)
          .then(resp)
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
          supplier: Joi.number().min(1).required().description('Supplier')
        }
      }
    }
  })

  registrar({
    method: 'GET',
    path: '/api/product',
    config: {
      handler: function (req, resp) {
        sequelize.query(`SELECT
          p.id,
            p.name,
            p.description,
            sum(IFNULL(m.quantity, 0)) quantity,
            p2.price
        FROM product p
        LEFT JOIN repository m ON m.productId=p.id
        LEFT JOIN (SELECT MAX(id) id, productId FROM repository GROUP BY productId) p1 ON p1.productId=p.id
        LEFT JOIN repository p2 ON p1.id=p2.id
        GROUP BY p.id;`, {type: sequelize.QueryTypes.SELECT})
          .then(resp)
      },
      description: 'List products',
      notes: 'List products',
      tags: ['api', 'get', 'product']
    }
  })
}
