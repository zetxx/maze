'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('baskets', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
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
      engine: 'InnoDB',
      charset: 'utf8'
    })
    .then(() => {
      queryInterface.addIndex('baskets', ['closed'])
      return 1;
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('baskets')
  }
}
