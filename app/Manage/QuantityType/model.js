const Sequelize = require('sequelize')
const db = require('../../../config/db')

const quantityType = db.define('quantityType', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  label: {
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

module.exports = quantityType
