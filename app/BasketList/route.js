const transaction = require('../Basket/models/transaction')
const basket = require('../Basket/models/basket')
const maze = require('../Management/Maze/model')
const product = require('../Management/Product/model')
maze.belongsTo(product)
transaction.belongsTo(maze)
transaction.belongsTo(basket)

module.exports = function(registrar) {
  registrar({
    method: 'GET',
    path: '/api/baskets',
    config: {
      handler: function (req, resp) {
        transaction.findAll({
          include: [{
            model: maze,
            as: 'maze',
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
