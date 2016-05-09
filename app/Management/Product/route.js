const Joi = require('joi')
const entity = require('./model.js')
const sequelize = require('../../common/db.js')

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
          description: Joi.string().required().description('Product description'),
          category: Joi.number().min(1).required().description('Product category')
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
        LEFT JOIN maze m ON m.productId=p.id
        LEFT JOIN (SELECT MAX(id) id, productId FROM maze GROUP BY productId) p1 ON p1.productId=p.id
        LEFT JOIN maze p2 ON p1.id=p2.id
        GROUP BY p.id;`, {type: sequelize.QueryTypes.SELECT})
        .then(resp)
      },
      description: 'List products',
      notes: 'List products',
      tags: ['api', 'get', 'product']
    }
  })
}
