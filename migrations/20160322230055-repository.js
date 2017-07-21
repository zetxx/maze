'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('repository', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'product',
          key: 'id'
        }
      },
      shopId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'shop',
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
      engine: 'MYISAM',
      charset: 'utf8'
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('repository')
  }
}
