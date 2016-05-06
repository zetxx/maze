const Sequelize = require('sequelize')
const db = require('../../common/db.js')

const maze = db.define('maze',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product: {
      type: Sequelize.INTEGER,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    quantity: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0.00
    },
    quantityType: {
      type: Sequelize.ENUM('kg', 'g', 'piece'),
      allowNull: false,
      defaultValue: 'piece'
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
  }
)

module.exports = maze
