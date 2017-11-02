const Joi = require('joi')
const PriceRules = require('../../PriceRules/model')

module.exports = (registrar) => {
  registrar({
    method: 'PUT',
    path: '/api/priceRules/{id}',
    config: {
      handler: (req, resp) => {
        PriceRules
          .update(req.payload, {where: {id: req.params.id}})
          .then((res) => {
            resp(res)
          })
      },
      description: 'Price Rule update',
      notes: 'Price Rule update',
      tags: ['api', 'price', 'rule', 'update'],
      validate: {
        payload: {
          name: Joi.string().min(1).required().description('Name'),
          rule: Joi.any().valid(['>', '<', 'between']).required().description('Rule'),
          hardValue: Joi.number().required().description('Hard value'),
          percentage: Joi.number().required().description('Percentage'),
          ruleValueFrom: Joi.number().required().description('Value from'),
          ruleValueTo: Joi.number().description('Value to')
        },
        params: {
          id: Joi.number().min(1).required().description('Price Rule Id')
        }
      }
    }
  })

  registrar({
    method: 'GET',
    path: '/api/priceRules/{id}',
    config: {
      handler: (req, resp) => {
        PriceRules
          .find({where: {id: req.params.id}})
          .then((res) => {
            resp(res || {})
          })
      },
      description: 'Price Rule get',
      notes: 'Price Rule get',
      tags: ['api', 'price', 'rule', 'get'],
      validate: {
        params: {
          id: Joi.number().min(1).required().description('Price Rule Id')
        }
      }
    }
  })
}
