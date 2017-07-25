const Joi = require('joi')
const sequelize = require('../../config/db')
const repository = require('../Manage/Repository/model')
const quantityType = require('../Manage/QuantityType/model')
const productCategories = require('../Manage/ProductCat/model')
const product = require('../Manage/Product/model')

product.hasOne(repository, {foreignKey : 'productId'})
product.belongsTo(quantityType, {foreignKey : 'quantityTypeId'})
product.belongsTo(productCategories, {foreignKey : 'category'})
repository.hasOne(product)
var shopId = 1;

module.exports = function(registrar) {
  registrar({
    method: 'POST',
    path: '/api/storeProductSearch',
    config: {
      handler: function (req, resp) {
        var prod = req.payload.product
        var where = {name: {$like: `%${prod}%`}}
        if (!isNaN(parseInt(prod))) {
          where.barcode = {$like: `%${prod}%`}
          where = {$or: [{name: where.name}, {barcode: where.barcode}]}
        }

        product.findAll({
          attributes: ['id', 'name', 'price'],
          include: [{
            attributes: ['shopId', 'quantity', 'id'],
            model: repository,
            where: {shopId}
          }, {
            attributes: ['label'],
            model: quantityType
          }, {
            attributes: ['id', 'name'],
            model: productCategories
          }],
          where
        })
          .then(resp)
          .catch((e) => {
            console.error(e)
            resp(e)
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
