const Sequelize = require('sequelize')
const db = require('../../config/db')

const config = db.define('config', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  key: {
    type: Sequelize.STRING,
    allowNull: false
  },
  value: {
    type: Sequelize.STRING,
    allowNull: false
  },
  addedAt: {
    type: Sequelize.DATE,
    defaultValue: new Date()
  }
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = config
