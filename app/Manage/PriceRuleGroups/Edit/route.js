const Joi = require('joi')
const PriceRuleGroups = require('../../PriceRuleGroups/model')
const PriceRuleGroupBinding = require('../../PriceRuleGroupBinding/model')
const sequelize = require('../../../../config/db')

module.exports = (registrar) => {
  registrar({
    method: 'PUT',
    path: '/api/priceRuleGroups/{id}',
    config: {
      handler: (req, resp) => {
        var priceRuleSelected = req.payload.priceRulesSelected || []
        delete (req.payload.priceRulesSelected)
        sequelize.transaction((t) => {
          return PriceRuleGroups
            .update(req.payload, {transaction: t, where: {id: req.params.id}})
            .then(() => {
              return PriceRuleGroupBinding
                .destroy({transaction: t, where: {priceRuleGroupId: req.params.id}})
            })
            .then(() => {
              priceRuleSelected = priceRuleSelected.map((priceRuleId) => ({
                priceRuleId,
                priceRuleGroupId: req.params.id
              }))
              return PriceRuleGroupBinding
                .bulkCreate(priceRuleSelected, {transaction: t})
            })
        })
          .then(resp)
          .catch((e) => {
            console.error(e)
            resp(e)
          })
      },
      description: 'Add price rule group',
      notes: 'Add price rule group',
      tags: ['api', 'add', 'price', 'rule', 'group'],
      validate: {
        payload: {
          name: Joi.string().min(1).required().description('Name'),
          simpleSum: Joi.number().required().description('Simple Sum'),
          priceRulesSelected: Joi.array().items(Joi.number().required().description('Price Rule id')).required().description('Selected price rules')
        }
      }
    }
  })
}
