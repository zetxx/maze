const Joi = require('joi')
const users = require('./model')
const roles = require('../Roles/model')
const priceRules = require('../../PriceRules/model')
const userPriceRule = require('../../UserPriceRule/model')
const userRoles = require('../UserRoles/model')
users.belongsToMany(roles, {through: userRoles})
users.belongsToMany(priceRules, {through: userPriceRule})
roles.belongsToMany(users, {through: userRoles})
priceRules.belongsToMany(users, {through: userPriceRule})

module.exports = (registrar) => {
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

  registrar({
    method: 'GET',
    path: '/api/user/{id}',
    config: {
      handler: (req, resp) => {
        users.findAll({
          where: {id: req.params.id},
          include: [{
            model: roles,
            as: 'roles'
          }, {
            model: priceRules,
            as: 'priceRules'
          }]
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
}
