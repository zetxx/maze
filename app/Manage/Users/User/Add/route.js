const Joi = require('joi')
const sequelize = require('../../../../../config/db.js')
const users = require('../model')
const roles = require('../../Roles/model')
const userRoles = require('../../UserRoles/model')
const userPriceRule = require('../../../UserPriceRule/model')
users.belongsToMany(roles, {through: userRoles})
roles.belongsToMany(users, {through: userRoles})

module.exports = (registrar) => {
  registrar({
    method: 'POST',
    path: '/api/user',
    config: {
      handler: (req, resp) => {
        sequelize.transaction((t) => {
          return users
            .create({
              userName: req.payload.userName,
              email: req.payload.email,
              shopId: 1
            }, {transaction: t})
            .then((user) => {
              if (req.payload.roles && req.payload.roles.length) {
                return userRoles
                  .bulkCreate(req.payload.roles.map((roleId) => ({roleId, userId: user.id})), {transaction: t})
                  .then(() => user)
              }
              return user
            })
            .then((user) => {
              if (req.payload.priceRules && req.payload.priceRules.length) {
                return userPriceRule
                  .bulkCreate(req.payload.priceRules.map((priceRuleId) => ({priceRuleId, userId: user.id})), {transaction: t})
                  .then(() => user)
              }
            })
        })
          .then((res) => {
            resp(res)
          })
      },
      description: 'User create',
      notes: 'User create',
      tags: ['api', 'create', 'user'],
      validate: {
        payload: {
          userName: Joi.string().min(5).required().description('User name'),
          email: Joi.string().min(5).required().description('User email'),
          roles: Joi.array().items(Joi.number().description('Role')).description('User roles'),
          priceRules: Joi.array().items(Joi.number().description('Price Rules')).description('User Price Rules')
        }
      }
    }
  })
}
