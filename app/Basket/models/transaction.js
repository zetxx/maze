const Sequelize = require('sequelize')
const db = require('../../common/db.js')

const transaction = db.define('transaction', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'product',
      key: 'id'
    }
  },
  basketId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'basket',
      key: 'id'
    }
  },
  quantity: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0.00
  },
  price: {
    type: Sequelize.FLOAT,
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

module.exports = transaction
