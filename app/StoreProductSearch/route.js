const Joi = require('joi')
// const sequelize = require('../../config/db')
const repository = require('../Manage/Repository/model')
const quantityType = require('../Manage/QuantityType/model')
const productCategories = require('../Manage/ProductCat/model')
const product = require('../Manage/Product/model')
const preHandlers = require('../preHandlers')
const backendHelpers = require('../backendHelpers')

product.hasOne(repository, {foreignKey: 'productId'})
product.belongsTo(quantityType, {foreignKey: 'quantityTypeId'})
product.belongsTo(productCategories, {foreignKey: 'category'})
repository.hasOne(product)

module.exports = function(registrar) {
  registrar({
    method: 'POST',
    path: '/api/storeProductSearch',
    config: {
      pre: preHandlers,
      handler: function (req, resp) {
        var pc = backendHelpers.priceCalc(backendHelpers.priceRuleExtract(req.pre.user.priceRuleGroups))
        var prod = req.payload.product
        var where = {name: {$like: `%${prod.trim()}%`}, enabled: 1}
        if (!isNaN(parseInt(prod))) {
          where.barcode = {$like: `%${prod.trim()}%`}
          where.enabled = 1
          where = {$or: [{name: where.name}, {barcode: where.barcode}]}
        }

        product.findAll({
          attributes: ['id', 'name', 'price'],
          include: [{
            attributes: ['shopId', 'quantity', 'id'],
            model: repository,
            where: {shopId: req.pre.user.shopId}
          }, {
            attributes: ['label'],
            model: quantityType
          }, {
            attributes: ['id', 'name'],
            model: productCategories
          }],
          where
        })
          .then((res) => {
            return res.map((item) => {
              return Object.assign(item, {price: pc(item.price)})
            })
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
