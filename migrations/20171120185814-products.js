'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('products', 'articleNum',
      {
        type: Sequelize.STRING(50),
        allowNull: true
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn('products', 'articleNum')
  }
}
