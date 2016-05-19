const Sequelize = require('sequelize')
const db = require('../../../config/db')

const product = db.define('product', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.INTEGER,
    references: {
      model: 'productCategory',
      key: 'id'
    }
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

module.exports = product
