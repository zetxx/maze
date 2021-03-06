const Joi = require('joi')
const supplier = require('./model.js')
const preHandlers = require('../../preHandlers')
const sequelize = require('../../../config/db')

module.exports = function(registrar) {
  registrar({
    method: 'POST',
    path: '/api/suppliers',
    config: {
      pre: preHandlers,
      handler: function (req, resp) {
        var record = {
          name: req.payload.name,
          description: req.payload.description
        }

        record.location = {type: 'Point', coordinates: [req.payload.lon, req.payload.lat]}
        supplier
          .create(record)
          .then(resp)
      },
      description: 'Add supplier',
      notes: 'Adds a supplier',
      tags: ['api', 'add', 'supplier'],
      validate: {
        payload: {
          name: Joi.string().required().description('Name'),
          address: Joi.string().description('Address'),
          phone: Joi.string().description('phone'),
          email: Joi.string().description('email'),
          description: Joi.string().required().description('description'),
          lon: Joi.number().min(1).description('Longitude'),
          lat: Joi.number().min(1).description('Latitude')
        }
      }
    }
  })

  registrar({
    method: 'GET',
    path: '/api/suppliers',
    config: {
      pre: preHandlers,
      handler: function (req, resp) {
        supplier
          .findAll({})
          .then(resp)
          .catch((err) => {
            console.error(err)
            resp(err)
          })
      },
      description: 'List suppliers',
      notes: 'List suppliers',
      tags: ['api', 'get', 'supplier']
    }
  })

  registrar({
    method: 'DELETE',
    path: '/api/suppliers/{supplierId}',
    config: {
      pre: preHandlers,
      handler: function (req, resp) {
        supplier
          .update({enabled: sequelize.literal('!enabled')}, {
            where: {id: req.params.supplierId}
          })
          .then(resp)
          .catch((e) => {
            console.error(e)
            resp(e)
          })
      },
      description: 'Disable supplier',
      notes: 'Disable supplier',
      tags: ['api', 'disable', 'supplier'],
      validate: {
        params: {
          supplierId: Joi.number().min(1).required().description('Supplier Id')
        }
      }
    }
  })
}
