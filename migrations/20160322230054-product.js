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
        quantityTypeId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'quantityType',
            key: 'id'
          },
          allowNull: false
        },
        price: {
          type: Sequelize.FLOAT,
          allowNull: false,
          defaultValue: 0.00
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
