const transaction = require('../Transaction/model')
const basket = require('../Basket/model')
const quantityType = require('../Manage/QuantityType/model')
const repository = require('../Manage/Repository/model')
const product = require('../Manage/Product/model')
product.belongsTo(quantityType, {foreignKey : 'quantityTypeId'})
repository.belongsTo(product)
transaction.belongsTo(repository)
transaction.belongsTo(basket)

module.exports = function(registrar) {
  registrar({
    method: 'GET',
    path: '/api/baskets',
    config: {
      handler: function (req, resp) {
        transaction.findAll({
          include: [{
            model: repository,
            as: 'repository',
            include: [{
              model: product,
              as: 'product',
              include: [{
                model: quantityType,
                as: 'quantityType'
              }]
            }]
          }, {
            model: basket,
            where: {closed: false},
            as: 'basket'
          }]
        })
       .then(resp)
      },
      description: 'List baskets',
      notes: 'List baskets',
      tags: ['api', 'add', 'baskets']
    }
  })
}
