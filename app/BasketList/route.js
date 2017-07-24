const transaction = require('../Transaction/model')
const baskets = require('../Basket/model')
const quantityType = require('../Manage/QuantityType/model')
const repositories = require('../Manage/Repository/model')
const product = require('../Manage/Product/model')
product.belongsTo(quantityType, {foreignKey : 'quantityTypeId'})
repositories.belongsTo(product)
transaction.belongsTo(repositories, {foreignKey : 'repositoryId'})
transaction.belongsTo(baskets)

module.exports = function(registrar) {
  registrar({
    method: 'GET',
    path: '/api/baskets',
    config: {
      handler: function (req, resp) {
        transaction.findAll({
          include: [{
            model: repositories,
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
            model: baskets,
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
