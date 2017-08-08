'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      repositoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'repositories',
          key: 'id'
        }
      },
      basketId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'baskets',
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
      engine: 'InnoDB',
      charset: 'utf8'
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('transactions')
  }
}
