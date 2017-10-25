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
    method: 'PUT',
    path: '/api/user/{id}',
    config: {
      handler: (req, resp) => {
        sequelize.transaction((t) => {
          return users
            .update({
              email: req.payload.email
            }, {
              where: {id: req.params.id}
            }, {
              transaction: t
            })
            .then((user) => {
              return userRoles.destroy({
                where: {userId: req.params.id}
              })
                .then((destroyed) => {
                  if (req.payload.roles) {
                    return userRoles.bulkCreate(req.payload.roles.map((roleId) => {
                      return {roleId, userId: req.params.id}
                    }))
                  }
                  return [destroyed]
                })
            })
            .then((prevDest) => {
              return userPriceRule.destroy({
                where: {userId: req.params.id}
              })
                .then((destroyed) => {
                  if (req.payload.priceRules) {
                    return userPriceRule.bulkCreate(req.payload.priceRules.map((priceRuleId) => {
                      return {priceRuleId, userId: req.params.id}
                    }))
                  }
                  return prevDest.concat(destroyed)
                })
            })
        })
          .then((res) => {
            resp(res)
          })
      },
      description: 'User update',
      notes: 'User update',
      tags: ['api', 'update', 'user'],
      validate: {
        payload: {
          email: Joi.string().min(5).required().description('User email'),
          roles: Joi.array().items(Joi.number().required().description('Role')).required().description('User roles'),
          priceRules: Joi.array().items(Joi.number().required().description('Price Rules')).required().description('User Price Rules')
        },
        params: {
          id: Joi.number().min(1).required().description('User Id')
        }
      }
    }
  })
}
