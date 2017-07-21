const Joi = require('joi')
const product = require('./model.js')
const repository = require('../Repository/model')
const quantityType = require('../QuantityType/model')
const sequelize = require('../../../config/db')
product.hasMany(repository, {foreignKey : 'productId'})
product.belongsTo(quantityType, {foreignKey : 'quantityTypeId'})
repository.hasOne(product, {foreignKey : 'id'})

module.exports = function(registrar) {
  registrar({
    method: 'POST',
    path: '/api/product',
    config: {
      handler: function (req, resp) {
        product
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
          supplier: Joi.number().min(1).required().description('Supplier'),
          quantityType: Joi.any().valid(['piece', 'kg', 'g']).required().description('one of: piece or weight'),
          price: Joi.string().regex(/[\d]+\.[\d]{2,2}/).required().description('Product Price')
        }
      }
    }
  })

  registrar({
    method: 'GET',
    path: '/api/product',
    config: {
      handler: function (req, resp) {
        product.findAll({
          attributes: ['id', 'name', 'price', [sequelize.fn('SUM', sequelize.col('repositories.quantity')), 'quantityTotal']],
          include: [{
            model: repository
          }, {
            model: quantityType
          }],
          group: 'product.id'
        })
          .then(resp)
          .catch((e) => {
            console.error(e)
            resp(e)
          })
        // sequelize.query(`SELECT
        //   p.id,
        //   p.name,
        //   p.description,
        //   p.quantityType,
        //   p.price,
        //   sum(IFNULL(m.quantity, 0)) quantity,
        //   p.price
        // FROM product p
        // LEFT JOIN repository m ON m.productId=p.id
        // GROUP BY p.id;`, {type: sequelize.QueryTypes.SELECT})
        //   .then(resp)
      },
      description: 'List products',
      notes: 'List products',
      tags: ['api', 'get', 'product']
    }
  })
}
