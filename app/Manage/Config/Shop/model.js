const Sequelize = require('sequelize')
const db = require('../../../../config/db')

module.exports = db.define('shops', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  workingHours: {
    type: Sequelize.STRING,
    allowNull: false
  },
  workingDays: {
    type: Sequelize.STRING,
    allowNull: false
  },
  location: {
    type: Sequelize.GEOMETRY('POINT')
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
