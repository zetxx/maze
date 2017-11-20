'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'currency',
      {
        type: Sequelize.ENUM('USD', 'EUR', 'JPY', 'GBP', 'RUB'),
        allowNull: true
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn('users', 'currency')
  }
}
