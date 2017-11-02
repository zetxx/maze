const Joi = require('joi')
const PriceRules = require('../../PriceRules/model')

module.exports = (registrar) => {
  registrar({
    method: 'POST',
    path: '/api/priceRules',
    config: {
      handler: (req, resp) => {
        PriceRules
          .create(req.payload)
          .then((res) => {
            resp(res)
          })
      },
      description: 'Add price rule',
      notes: 'Add price rule',
      tags: ['api', 'add', 'price', 'rule'],
      validate: {
        payload: {
          name: Joi.string().min(1).required().description('Name'),
          rule: Joi.any().valid(['>', '<', 'between']).required().description('Rule'),
          hardValue: Joi.number().required().description('Hard value'),
          percentage: Joi.number().required().description('Percentage'),
          ruleValueFrom: Joi.number().required().description('Value from'),
          ruleValueTo: Joi.number().description('Value to')
        }
      }
    }
  })
}
