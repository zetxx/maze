'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('repositories', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id'
        }
      },
      shopId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'shops',
          key: 'id'
        }
      },
      quantity: {
        type: Sequelize.FLOAT.UNSIGNED,
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
    .then(() => {
      return queryInterface.addIndex(
        'repositories',
        ['productId', 'shopId'],
        {
          indexName: 'productId_shopId',
          indicesType: 'UNIQUE'
        }
      )
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('repositories')
  }
}
