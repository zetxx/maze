// const sequelize = require('../../config/db')
const config = require('../Config/model')
const Promise = require('bluebird')

module.exports = function(registrar) {
  registrar({
    method: 'GET',
    path: '/api/config',
    config: {
      handler: (req, resp) => {
        config.findAll()
          .then(resp)
          .catch((e) => {
            console.error(e)
            resp(e)
          })
      },
      description: 'App configuration',
      notes: 'App configuration',
      tags: ['api', 'get', 'config']
    }
  })

  registrar({
    method: 'POST',
    path: '/api/config',
    config: {
      handler: (req, resp) => {
        var forUpdate = Object.keys(req.payload)
        if (forUpdate.length > 0) {
          forUpdate = forUpdate.map((u) => {
            return config.update({value: req.payload[u]}, {where: {key: u}}).then(() => (u))
          })
        }
        return Promise
          .all(forUpdate)
          .then(resp)
      },
      description: 'App configuration',
      notes: 'App configuration',
      tags: ['api', 'get', 'config']
    }
  })
}
