'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('maza', {
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
        type: Sequelize.ENUM('weight', 'piece'),
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
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('maza')
  }
}
