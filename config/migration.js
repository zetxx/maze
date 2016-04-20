const config = require('./server.js')

module.exports = {
  development: {
    url: config.db,
    dialect: config.dbDialec
  },
  test: {
    url: config.db,
    dialect: config.dbDialec
  },
  production: {
    url: config.db,
    dialect: config.dbDialec
  }
}
