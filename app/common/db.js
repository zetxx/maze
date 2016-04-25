
const Sequelize = require('sequelize')
const config = require('../../config/server.js')
const sequelize = new Sequelize(config.db)

module.exports = sequelize
