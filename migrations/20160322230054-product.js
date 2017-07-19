'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('product',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        category: {
          type: Sequelize.INTEGER,
          references: {
            model: 'productCategory',
            key: 'id'
          },
          allowNull: false
        },
        supplier: {
          type: Sequelize.INTEGER,
          references: {
            model: 'supplier',
            key: 'id'
          },
          allowNull: false
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        barcode: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true
        },
        addedAt: {
          type: Sequelize.DATE,
          defaultValue: new Date()
        }
      }, {
        engine: 'MYISAM',
        charset: 'utf8'
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('product')
  }
}
