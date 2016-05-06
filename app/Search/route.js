const product = require('../Management/Product/model.js')

module.exports = function(registrar) {
  registrar({
    method: 'GET',
    path: '/api/product/search/{search}',
    config: {
      handler: function (req, resp) {
        product
        .findAll({
          where: {
            name: {
              like: `%${req.params.search}%`
            }
          }
        })
        .then(resp)
        .catch((err) => {
          console.error(err)
          resp(err)
        })
      },
      description: 'Search products',
      notes: 'Search products',
      tags: ['api', 'get', 'product']
    }
  })
}
