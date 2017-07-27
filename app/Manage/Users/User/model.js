const Sequelize = require('sequelize')
const db = require('../../../../config/db')

const users = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  priceRuleId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'priceRules',
      key: 'id'
    },
    allowNull: false
  },
  shopId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'shops',
      key: 'id'
    },
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

module.exports = users
