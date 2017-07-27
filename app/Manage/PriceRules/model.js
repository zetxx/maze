const Sequelize = require('sequelize')
const db = require('../../../config/db')

const priceRules = db.define('priceRules', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rule: {
    type: Sequelize.ENUM('<', '>'),
    allowNull: false,
    defaultValue: '>'
  },
  ruleValue: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  percentage: {
    type: Sequelize.FLOAT(10, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  hardValue: {
    type: Sequelize.FLOAT(10, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  addedAt: {
    type: Sequelize.DATE,
    defaultValue: new Date()
  }
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = priceRules
