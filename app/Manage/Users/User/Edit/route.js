const Joi = require('joi')
const users = require('../model')
const roles = require('../../Roles/model')
const userRoles = require('../../UserRoles/model')
users.belongsToMany(roles, {through: userRoles})
roles.belongsToMany(users, {through: userRoles})

module.exports = (registrar) => {
  registrar({
    method: 'PUT',
    path: '/api/user/{id}',
    config: {
      handler: (req, resp) => {
        resp('Not implemented')
      },
      description: 'User update',
      notes: 'User update',
      tags: ['api', 'update', 'user'],
      validate: {
        payload: {
          email: Joi.string().min(5).required().description('User email'),
          roles: Joi.array().items(Joi.number().required().description('Role')).required().description('User roles')
        },
        params: {
          id: Joi.number().min(1).required().description('User Id')
        }
      }
    }
  })
}
