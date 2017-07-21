const Joi = require('joi')
const entity = require('./model.js')

module.exports = function(registrar) {
  registrar({
    method: 'POST',
    path: '/api/repository',
    config: {
      handler: function (req, resp) {
        entity
          .create(req.payload)
          .then(resp)
      },
      description: 'Add to repository',
      notes: 'loads products  into repository',
      tags: ['api', 'add', 'repository'],
      validate: {
        payload: {
          quantity: Joi.number().min(1).required().description('Product quantity, how many'),
          shopId: Joi.number().min(1).required().description('Shop Id'),
          productId: Joi.number().min(1).required().description('Product Id')
        }
      }
    }
  })
}
