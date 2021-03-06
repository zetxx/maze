'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('users', 'currency',
      {
        type: Sequelize.ENUM('USD', 'EUR', 'JPY', 'GBP', 'RUB', 'BGN'),
        allowNull: true,
        defaultValue: 'BGN'
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('users', 'currency',
      {
        type: Sequelize.ENUM('USD', 'EUR', 'JPY', 'GBP', 'RUB'),
        allowNull: true
      }
    )
  }
}
