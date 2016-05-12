'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('transaction', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      mazeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'maze',
          key: 'id'
        }
      },
      basketId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'basket',
          key: 'id'
        }
      },
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.00
      },
      closed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      addedAt: {
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    }, {
      engine: 'MYISAM',
      charset: 'utf8'
    })
    .then(() => {
      queryInterface.addIndex('transaction', ['closed'])
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('transaction')
  }
}
