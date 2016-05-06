const Joi = require('joi')
const sequelize = require('../common/db.js')

module.exports = function(registrar) {
  registrar({
    method: 'POST',
    path: '/api/sellSearch',
    config: {
      handler: function (req, resp) {
        sequelize.query(`SELECT
          p.id,
            p.name,
            p.description,
            sum(IFNULL(m.quantity, 0)) quantity,
            p2.price,
            p2.quantityType
        FROM product p
        LEFT JOIN maze m ON m.product=p.id
        LEFT JOIN (SELECT MAX(id) id, product FROM maze GROUP BY product) p1 ON p1.product=p.id
        LEFT JOIN maze p2 ON p1.id=p2.id
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
