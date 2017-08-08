'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('userRoles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      roleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'roles',
          key: 'id'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
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
    return queryInterface.dropTable('userRoles')
  }
}
