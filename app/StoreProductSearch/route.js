const Joi = require('joi')
const sequelize = require('../../config/db')

module.exports = function(registrar) {
  registrar({
    method: 'POST',
    path: '/api/storeProductSearch',
    config: {
      handler: function (req, resp) {
        sequelize.query(`SELECT
            p.id,
            p1.id repositoryId,
            p.name,
            p.description,
            sum(IFNULL(m.quantity, 0)) quantity,
            p2.price,
            p2.quantityType
        FROM product p
        LEFT JOIN repository m ON m.productId=p.id
        LEFT JOIN (SELECT MAX(id) id, productId FROM repository GROUP BY productId) p1 ON p1.productId=p.id
        LEFT JOIN repository p2 ON p1.id=p2.id
        WHERE name LIKE :name
        GROUP BY p.id;`, {replacements: { name: `%${req.payload.product}%` }, type: sequelize.QueryTypes.SELECT})
        .then(resp)
        .catch((err) => {
          resp(err)
        })
      },
      description: 'Search products',
      notes: 'Search products',
      tags: ['api', 'get', 'product'],
      validate: {
        payload: {
          product: Joi.string().required().description('Product')
        }
      }
    }
  })
}
