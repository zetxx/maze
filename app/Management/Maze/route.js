const Joi = require('joi')
const entity = require('./model.js')

module.exports = function(registrar) {
  registrar({
    method: 'POST',
    path: '/api/maze',
    config: {
      handler: function (req, resp) {
        entity
          .create(req.payload)
          .then(resp)
      },
      description: 'Add to maze',
      notes: 'loads products  into maze',
      tags: ['api', 'add', 'maze'],
      validate: {
        payload: {
          quantity: Joi.number().min(1).required().description('Product quantity, how many'),
          product: Joi.number().min(1).required().description('Product Id'),
          quantityType: Joi.any().valid(['piece', 'weight']).required().description('one of: piece or weight'),
          price: Joi.string().regex(/[\d]+\.[\d]{2,2}/).required().description('Product Price')
        }
      }
    }
  })
}
