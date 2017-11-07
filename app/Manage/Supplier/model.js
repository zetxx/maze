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
  address: {
    type: Sequelize.STRING,
    allowNull: true
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
  enabled: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
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
