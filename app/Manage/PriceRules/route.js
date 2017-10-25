// const Joi = require('joi')
const priceRules = require('./model')

module.exports = (registrar) => {
  registrar({
    method: 'GET',
    path: '/api/priceRules',
    config: {
      handler: (req, resp) => {
        priceRules.findAll({})
          .then(resp)
          .catch((err) => {
            console.error(err)
            resp(err)
          })
      },
      description: 'Get price rules',
      notes: 'Get price rules',
      tags: ['api', 'get', 'price rules']
    }
  })
}
