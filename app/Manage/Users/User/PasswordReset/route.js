const Joi = require('joi')
const users = require('../model')
const crypto = require('crypto')

module.exports = (registrar) => {
  registrar({
    method: 'POST',
    path: '/api/user/passwordReset/{id}',
    config: {
      handler: (req, resp) => {
        const hash = crypto.createHash('sha256')
        hash.update(req.payload.password)
        users
          .update({password: hash.digest('hex')}, {where: {id: req.params.id}})
          .then(resp)
          .catch((err) => {
            console.error(err)
            resp(err)
          })
      },
      description: 'User password reset',
      notes: 'User password reset',
      tags: ['api', 'password reset', 'user'],
      validate: {
        payload: {
          password: Joi.string().min(1).required().description('User password')
        },
        params: {
          id: Joi.number().min(1).required().description('User Id')
        }
      }
    }
  })
}
