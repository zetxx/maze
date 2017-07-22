const Joi = require('joi')
const sequelize = require('../../config/db')
const repository = require('../Manage/Repository/model')
const quantityType = require('../Manage/QuantityType/model')
const productCategory = require('../Manage/ProductCat/model')
const product = require('../Manage/Product/model')

product.hasMany(repository, {foreignKey : 'productId'})
product.belongsTo(quantityType, {foreignKey : 'quantityTypeId'})
product.belongsTo(productCategory, {foreignKey : 'category'})
repository.hasOne(product, {foreignKey : 'id'})

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
        console.log(where)
        product.findAll({
          attributes: ['id', 'name', 'price', [sequelize.fn('SUM', sequelize.col('repositories.quantity')), 'quantityTotal']],
          include: [{
            model: repository
          }, {
            model: quantityType
          }, {
            model: productCategory
          }],
          where,
          group: 'product.id'
        })
          .then(resp)
          .catch((e) => {
            console.error(e)
            resp(e)
          })
        // sequelize.query(`SELECT
        //     p.id,
        //     p1.id repositoryId,
        //     p.name,
        //     p.description,
        //     sum(IFNULL(m.quantity, 0)) quantity,
        //     p2.price,
        //     p2.quantityType
        // FROM product p
        // LEFT JOIN repository m ON m.productId=p.id
        // LEFT JOIN (SELECT MAX(id) id, productId FROM repository GROUP BY productId) p1 ON p1.productId=p.id
        // LEFT JOIN repository p2 ON p1.id=p2.id
        // WHERE
        //   p2.price > 0 AND
        //   (
        //     name LIKE :name OR
        //     barcode LIKE :barcode
        //   )
        // GROUP BY p.id;`, queryParams)
        // .then(resp)
        // .catch((err) => {
        //   resp(err)
        // })
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
