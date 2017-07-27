'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      priceRuleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'priceRules',
          key: 'id'
        },
        allowNull: false
      },
      shopId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'shops',
          key: 'id'
        },
        allowNull: false
      },
      addedAt: {
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    }, {
      engine: 'MYISAM',
      charset: 'utf8'
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('users')
  }
}
