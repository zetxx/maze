const Sequelize = require('sequelize')
const db = require('../../config/db')

const transaction = db.define('transaction', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  repositoryId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'repository',
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
  addedAt: {
    type: Sequelize.DATE,
    defaultValue: new Date()
  }
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = transaction
