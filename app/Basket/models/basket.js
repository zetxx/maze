const Sequelize = require('sequelize')
const db = require('../../common/db.js')

const basket = db.define('basket', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  closed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  addedAt: {
    type: Sequelize.DATE,
    defaultValue: new Date()
  }
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = basket
