const transaction = require('../Transaction/model')
const basket = require('../Basket/model')
const repository = require('../ProductManagement/Repository/model')
const product = require('../ProductManagement/Product/model')
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
              as: 'product'
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
