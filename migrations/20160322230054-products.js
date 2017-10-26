'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('products',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        category: {
          type: Sequelize.INTEGER,
          references: {
            model: 'productCategories',
            key: 'id'
          },
          allowNull: false
        },
        supplier: {
          type: Sequelize.INTEGER,
          references: {
            model: 'suppliers',
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
            model: 'quantityTypes',
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
      }
    )
      .then(() => {
        return queryInterface.addIndex(
          'products',
          ['category'],
          {
            indexName: 'products_category'
          }
        )
      })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('products')
  }
}
