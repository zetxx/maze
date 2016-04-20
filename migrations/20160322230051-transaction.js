'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('transaction', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      group: {
        type: Sequelize.INTEGER,
        references: 'transactionGroup',
        referencesKey: 'id'
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
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('transaction')
  }
}
