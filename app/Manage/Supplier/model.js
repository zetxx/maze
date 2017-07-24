const Sequelize = require('sequelize')
const db = require('../../../config/db')

const suppliers = db.define('suppliers', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  location: {
    type: Sequelize.GEOMETRY('POINT'),
    allowNull: true
  },
  description: {
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

module.exports = suppliers
