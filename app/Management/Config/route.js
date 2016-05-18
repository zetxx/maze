const Joi = require('joi')
const sequelize = require('../../common/db.js')

module.exports = function(registrar) {
  registrar({
    method: 'GET',
    path: '/api/config',
    config: {
      handler: (req, resp) => {
        sequelize.query('SELECT \'en\' globalLanguage', {type: sequelize.QueryTypes.SELECT})
        .then(resp)
      },
      description: 'App configuration',
      notes: 'App configuration',
      tags: ['api', 'get', 'config']
    }
  })
}
