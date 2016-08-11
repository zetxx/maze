const Joi = require('joi')
const users = require('./model')
const roles = require('../Roles/model')
const userRoles = require('../UserRoles/model')
users.belongsToMany(roles, {through: userRoles})
roles.belongsToMany(users, {through: userRoles})

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
          }]
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

  registrar({
    method: 'POST',
    path: '/api/user',
    config: {
      handler: (req, resp) => {
        resp('Not implemented')
      },
      description: 'User create',
      notes: 'User create',
      tags: ['api', 'create', 'user'],
      validate: {
        payload: {
          email: Joi.string().min(5).required().description('User email'),
          roles: Joi.array().items(Joi.number().required().description('Role')).required().description('User roles')
        }
      }
    }
  })
}
