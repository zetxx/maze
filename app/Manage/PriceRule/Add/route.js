const Joi = require('joi')
const sequelize = require('../../../../../config/db')
const role = require('../../Roles/model')
const permissions = require('../../Permissions/model')

module.exports = (registrar) => {
  registrar({
    method: 'POST',
    path: '/api/role',
    config: {
      handler: (req, resp) => {
        sequelize.transaction((t) => {
          return role
            .create({
              name: req.payload.name
            }, {transaction: t})
            .then((newRole) => {
              if (req.payload.permissions && req.payload.permissions.length) {
                return permissions.bulkCreate(req.payload.permissions.map((el) => ({
                  roleId: newRole.id,
                  actionId: el.actionId,
                  permission: el.permission
                })))
              }
            })
        })
        .then((res) => {
          resp(res)
        })
      },
      description: 'Add role',
      notes: 'Add role',
      tags: ['api', 'add', 'role'],
      validate: {
        payload: {
          name: Joi.string().min(3).required().description('Role name'),
          permissions: Joi.array().items(Joi.object({
            actionId: Joi.number().min(1).description('Action assigned'),
            permission: Joi.any().valid([1, 2]).description('Permission given against action and role')
          }).description('Role')).description('Role permissions')
        }
      }
    }
  })
}
