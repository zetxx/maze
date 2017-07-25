const transaction = require('../Transaction/model')
const baskets = require('../Basket/model')
const quantityType = require('../Manage/QuantityType/model')
const repository = require('../Manage/Repository/model')
const product = require('../Manage/Product/model')
transaction.belongsTo(repository)
transaction.belongsTo(baskets)
product.belongsTo(quantityType)
repository.belongsTo(product)

module.exports = function(registrar) {
  registrar({
    method: 'GET',
    path: '/api/baskets',
    config: {
      handler: function (req, resp) {
        transaction.findAll({
          attributes: ['id'],
          include: [{
            attributes: ['id', 'quantity'],
            model: repository,
            as: 'repository',
            include: [{
              attributes: ['id', 'price'],
              model: product,
              as: 'product',
              include: [{
                attributes: ['label'],
                model: quantityType,
                as: 'quantityType'
              }]
            }]
          }, {
            attributes: ['id', 'name'],
            model: baskets,
            where: {closed: false},
            as: 'basket'
          }]
        })
       .then(resp)
       .catch((e) => {
          console.error(e)
          resp(e)
        })
      },
      description: 'List baskets',
      notes: 'List baskets',
      tags: ['api', 'add', 'baskets']
    }
  })
}
