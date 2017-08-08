'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('priceRules', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      rule: {
        type: Sequelize.ENUM('<', '>'),
        allowNull: false,
        defaultValue: '>'
      },
      ruleValue: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      percentage: {
        type: Sequelize.FLOAT(10, 2),
        allowNull: false,
        defaultValue: 0.00
      },
      hardValue: {
        type: Sequelize.FLOAT(10, 2),
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
    return queryInterface.dropTable('priceRules')
  }
}
