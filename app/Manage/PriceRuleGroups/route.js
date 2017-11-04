const Joi = require('joi')
const PriceRuleGroup = require('./model')
const PriceRules = require('../PriceRules/model')
const PriceRuleGroupBinding = require('../PriceRuleGroupBinding/model')

PriceRules.belongsToMany(PriceRuleGroup, {through: PriceRuleGroupBinding})
PriceRuleGroup.belongsToMany(PriceRules, {through: PriceRuleGroupBinding})

module.exports = (registrar) => {
  registrar({
    method: 'GET',
    path: '/api/priceRuleGroups',
    config: {
      handler: (req, resp) => {
        PriceRuleGroup.findAll({where: {enabled: 1}})
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

  registrar({
    method: 'GET',
    path: '/api/priceRuleGroups/{id}',
    config: {
      handler: (req, resp) => {
        PriceRuleGroup.find(
          {
            include: [{
              attributes: ['id', 'name'],
              model: PriceRules
            }],
            where: {enabled: 1, id: req.params.id}
          }
        )
          .then((r) => (
            PriceRules
              .findAll({where: {enabled: 1}})
              .then((rr) => ({PriceRuleGroup: (r || {}), PriceRules: rr || []}))
          ))
          .then(resp)
          .catch((err) => {
            console.error(err)
            resp(err)
          })
      },
      description: 'Get price rule groups',
      notes: 'Get price rule groups',
      tags: ['api', 'get', 'price', 'rule', 'groups'],
      validate: {
        params: {
          id: Joi.number().min(1).required().description('Price Rule Id')
        }
      }
    }
  })
}
