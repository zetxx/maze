'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('priceRuleGroupBinding', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      priceRuleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'priceRules',
          key: 'id'
        },
        allowNull: false
      },
      priceRuleGroupId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'priceRuleGroup',
          key: 'id'
        },
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
    return queryInterface.dropTable('priceRuleGroupBinding')
  }
}
