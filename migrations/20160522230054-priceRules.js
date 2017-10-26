'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('priceRules', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rule: {
        type: Sequelize.ENUM('<', '>', 'between'),
        allowNull: false,
        defaultValue: '>'
      },
      ruleValueFrom: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      ruleValueTo: {
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
      enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
