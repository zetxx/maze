const Sequelize = require('sequelize')
const db = require('../../../../config/db')

const actions = db.define('actions', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: { // GET, POST, PUT, DELETE
    type: Sequelize.STRING,
    allowNull: false
  },
  uri: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
  addedAt: {
    type: Sequelize.DATE,
    defaultValue: new Date()
  }
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = actions
