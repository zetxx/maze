'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('currencyRates', {
        currency: {
          type: Sequelize.STRING,
          allowNull: false
        },
        rate: {
          type: Sequelize.DOUBLE(15, 11),
          allowNull: false
        },
        addedAt: {
          type: Sequelize.DATE,
          defaultValue: new Date()
        }
      }, {
        engine: 'InnoDB',
        charset: 'utf8'
      })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('currencyRates')
  }
}
