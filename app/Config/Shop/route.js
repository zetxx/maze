const Joi = require('joi')
const entity = require('./model.js')

module.exports = function(registrar) {
  registrar({
    method: 'POST',
    path: '/api/Shop',
    config: {
      handler: function (req, resp) {
        var record = {
          name: req.payload.name,
          workingHours: '8:00-17:00',
          description: '-',
          workingDays: 'm-f'
        }

        record.location = {type: 'Point', coordinates: [req.payload.lon, req.payload.lat]}
        entity
          .create(record)
          .then(resp)
      },
      description: 'Add shop',
      notes: 'Adds a shop',
      tags: ['api', 'add', 'shop'],
      validate: {
        payload: {
          name: Joi.string().required().description('Name'),
          lon: Joi.number().min(1).required().description('Longitude'),
          lat: Joi.number().min(1).required().description('Latitude')
        }
      }
    }
  })

  registrar({
    method: 'GET',
    path: '/api/Shop',
    config: {
      handler: function (req, resp) {
        entity
          .findAll({})
          .then(resp)
          .catch((err) => {
            console.error(err)
            resp(err)
          })
      },
      description: 'List Shops',
      notes: 'List Shops',
      tags: ['api', 'get', 'Shops']
    }
  })
}
