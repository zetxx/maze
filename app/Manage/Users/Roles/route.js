// const Joi = require('joi')
const roles = require('./model')
const permissions = require('../Permissions/model')
const actions = require('../Actions/model')
roles.belongsToMany(actions, {through: permissions})
// roles.hasMany(permissions)
actions.belongsToMany(roles, {through: permissions})

module.exports = (registrar) => {
  registrar({
    method: 'GET',
    path: '/api/roles',
    config: {
      handler: (req, resp) => {
        roles.findAll({})
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
}
