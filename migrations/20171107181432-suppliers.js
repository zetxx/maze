'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('suppliers', 'address',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    )
      .then(() => {
        return queryInterface.addColumn('suppliers', 'phone',
          {
            type: Sequelize.STRING,
            allowNull: true
          }
        )
      })
      .then(() => {
        return queryInterface.addColumn('suppliers', 'email',
          {
            type: Sequelize.STRING,
            allowNull: true
          }
        )
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn('suppliers', 'address')
      .then(() => {
        return queryInterface
          .removeColumn('suppliers', 'phone')
      })
      .then(() => {
        return queryInterface
          .removeColumn('suppliers', 'email')
      })
  }
}
