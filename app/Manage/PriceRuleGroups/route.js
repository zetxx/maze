// const Joi = require('joi')
const priceRuleGroups = require('./model')

module.exports = (registrar) => {
  registrar({
    method: 'GET',
    path: '/api/priceRuleGroups',
    config: {
      handler: (req, resp) => {
        priceRuleGroups.findAll({where: {enabled: 1}})
          .then(resp)
          .catch((err) => {
            console.error(err)
            resp(err)
          })
      },
      description: 'Get price rule groups',
      notes: 'Get price rule groups',
      tags: ['api', 'get', 'price', 'rule', 'groups']
    }
  })
}
