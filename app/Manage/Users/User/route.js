const Joi = require('joi')
const users = require('./model')
const roles = require('../Roles/model')
const userRoles = require('../UserRoles/model')
// const PriceRules = require('../../PriceRules/model')
// const PriceRuleGroupBinding = require('../../PriceRuleGroupBinding/model')
const UserPriceRuleGroup = require('../../UserPriceRuleGroup/model')
const PriceRuleGroup = require('../../PriceRuleGroups/model')
users.belongsToMany(roles, {through: userRoles})
roles.belongsToMany(users, {through: userRoles})

users.belongsToMany(PriceRuleGroup, {through: UserPriceRuleGroup})
PriceRuleGroup.belongsToMany(users, {through: UserPriceRuleGroup})

// PriceRules.belongsToMany(PriceRuleGroup, {through: PriceRuleGroupBinding})
// PriceRuleGroup.belongsToMany(PriceRules, {through: PriceRuleGroupBinding})

module.exports = (registrar) => {
  registrar({
    method: 'GET',
    path: '/api/user/{id}',
    config: {
      handler: (req, resp) => {
        users.find({
          attributes: ['id', 'userName', 'email', 'shopId'],
          where: {id: req.params.id},
          include: [{
            model: roles,
            as: 'roles'
          }, {
            attributes: ['id'],
            model: PriceRuleGroup
          }]
        })
          .then((user) => {
            return PriceRuleGroup
              .findAll({
                attributes: ['id', 'name'],
                where: {enabled: 1}
              })
              .then((prg) => ({user: user || {}, PriceRuleGroups: prg}))
          })
          .then(resp)
          .catch((err) => {
            console.error(err)
            resp(err)
          })
      },
      description: 'Get user',
      notes: 'Get user by id',
      tags: ['api', 'get', 'user'],
      validate: {
        params: {
          id: Joi.number().min(1).required().description('User Id')
        }
      }
    }
  })

  registrar({
    method: 'GET',
    path: '/api/users',
    config: {
      handler: (req, resp) => {
        users.findAll({
          include: [{
            model: roles,
            as: 'roles'
          }],
          where: {enabled: true}
        })
          .then(resp)
          .catch((err) => {
            console.error(err)
            resp(err)
          })
      },
      description: 'Get users',
      notes: 'Get users',
      tags: ['api', 'get', 'users']
    }
  })
}
