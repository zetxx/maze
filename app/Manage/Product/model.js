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
  barcode: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  category: {
    type: Sequelize.INTEGER,
    references: {
      model: 'productCategory',
      key: 'id'
    }
  },
  supplier: {
    type: Sequelize.INTEGER,
    references: {
      model: 'supplier',
      key: 'id'
    }
  },
  quantityTypeId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'quantityType',
      key: 'id'
    },
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0.00
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
