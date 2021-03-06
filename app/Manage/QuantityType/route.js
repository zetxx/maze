const Joi = require('joi')
const preHandlers = require('../../preHandlers')
const product = require('./model.js')
const repository = require('../Repository/model')
const quantityTypes = require('./model')

module.exports = function(registrar) {
  registrar({
    method: 'GET',
    path: '/api/quantityTypes',
    config: {
      pre: preHandlers,
      handler: function (req, resp) {
        quantityTypes.findAll()
          .then(resp)
          .catch((e) => {
            console.error(e)
            resp(e)
          })
      },
      description: 'List quantity types',
      notes: 'List quantity types',
      tags: ['api', 'get', 'quantity types']
    }
  })
}
