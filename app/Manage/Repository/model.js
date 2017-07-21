const Sequelize = require('sequelize')
const db = require('../../../config/db')

const repository = db.define('repository',
  {
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
    shopId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'shop',
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
  }
)

module.exports = repository