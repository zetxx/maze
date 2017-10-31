const Joi = require('joi')
const roles = require('./model')
const permissions = require('../Permissions/model')
const actions = require('../Actions/model')
roles.belongsToMany(actions, {through: permissions})
roles.hasMany(permissions, {as: 'rolePermissions'})
actions.belongsToMany(roles, {through: permissions})

module.exports = (registrar) => {
  registrar({
    method: 'GET',
    path: '/api/roles',
    config: {
      handler: (req, resp) => {
        roles.findAll({where: {enabled: true}})
          .then(resp)
          .catch((err) => {
            console.error(err)
            resp(err)
          })
      },
      description: 'Get roles',
      notes: 'Get roles',
      tags: ['api', 'get', 'roles']
    }
  })

  registrar({
    method: 'GET',
    path: '/api/role/{id}',
    config: {
      handler: (req, resp) => {
        roles.find({
          where: {id: req.params.id},
          include: ['rolePermissions']
        })
          .then(resp)
          .catch((err) => {
            console.error(err)
            resp(err)
          })
      },
      description: 'Get roles',
      notes: 'Get roles',
      tags: ['api', 'get', 'roles'],
      validate: {
        params: {
          id: Joi.number().min(1).required().description('Role Id')
        }
      }
    }
  })
}
