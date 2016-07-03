const Joi = require('joi')
const entity = require('./model.js')

module.exports = function(registrar) {
  registrar({
    method: 'POST',
    path: '/api/Shop',
    config: {
      handler: function (req, resp) {
        entity
          .create(req.payload)
          .then(resp)
      },
      description: 'Add shop',
      notes: 'Adds a shop',
      tags: ['api', 'add', 'shop'],
      validate: {
        payload: {
          name: Joi.string().required().description('Category name')
        }
      }
    }
  })

  registrar({
    method: 'GET',
    path: '/api/Shop',
    config: {
      handler: function (req, resp) {
        entity
          .findAll({})
          .then(resp)
          .catch((err) => {
            console.error(err)
            resp(err)
          })
      },
      description: 'List Shops',
      notes: 'List Shops',
      tags: ['api', 'get', 'Shops']
    }
  })
}
