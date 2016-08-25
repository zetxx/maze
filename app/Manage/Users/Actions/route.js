// const Joi = require('joi')
const actions = require('./model')

module.exports = (registrar) => {
  registrar({
    method: 'GET',
    path: '/api/actions',
    config: {
      handler: (req, resp) => {
        actions.findAll({})
          .then(resp)
          .catch((err) => {
            console.error(err)
            resp(err)
          })
      },
      description: 'Get actions',
      notes: 'Get actions',
      tags: ['api', 'get', 'actions']
    }
  })
}
