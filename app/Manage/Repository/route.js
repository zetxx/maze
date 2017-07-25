const Joi = require('joi')
const entity = require('./model.js')
const sequelize = require('../../../config/db')

module.exports = function(registrar) {
  registrar({
    method: 'POST',
    path: '/api/repositories',
    config: {
      handler: function (req, resp) {
        entity
          .find({where: {productId: req.payload.productId, shopId: req.payload.shopId}})
          .then((r) => {
            if (!r) {
              return entity
                .create(req.payload)
            } else {
              return entity
                .update({quantity: sequelize.literal(`quantity +${parseInt(req.payload.quantity)}`)}, {where: {shopId: req.payload.shopId, productId: req.payload.productId}})
            }
          })
          .then(resp)
          .catch((e) => {
            console.error(e)
            resp(e)
          })
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
