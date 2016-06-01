const sequelize = require('../../config/db')

module.exports = function(registrar) {
  registrar({
    method: 'GET',
    path: '/api/config',
    config: {
      handler: (req, resp) => {
        sequelize.query('SELECT \'en\' globalLanguage', {type: sequelize.QueryTypes.SELECT})
        .then(resp)
        .catch(resp)
      },
      description: 'App configuration',
      notes: 'App configuration',
      tags: ['api', 'get', 'config']
    }
  })
}
