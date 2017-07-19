const Joi = require('joi')
const sequelize = require('../../../../../config/db')
const role = require('../../Roles/model')
const permissions = require('../../Permissions/model')

module.exports = (registrar) => {
  registrar({
    method: 'PUT',
    path: '/api/role/{id}',
    config: {
      handler: (req, resp) => {
        sequelize.transaction((t) => {
          return role
            .update({
              name: req.payload.name
            }, {
              where: {id: req.params.id}
            }, {
              transaction: t
            })
            .then((updatedRole) => {
              return permissions.destroy({
                where: {roleId: req.params.id}
              })
            })
            .then(() => {
              if (req.payload.permissions && req.payload.permissions.length) {
                return permissions.bulkCreate(req.payload.permissions.map((el) => ({
                  roleId: req.params.id,
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
      description: 'Role update',
      notes: 'Role update',
      tags: ['api', 'update', 'role'],
      validate: {
        payload: {
          name: Joi.string().min(3).required().description('Role name'),
          permissions: Joi.array().items(Joi.object({
            actionId: Joi.number().min(1).description('Action assigned'),
            permission: Joi.any().valid([1, 2]).description('Permission given against action and role')
          }).description('Role')).description('Role permissions')
        },
        params: {
          id: Joi.number().min(1).required().description('User Id')
        }
      }
    }
  })
}
