'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('shops', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      workingHours: {
        type: Sequelize.STRING,
        allowNull: false
      },
      workingDays: {
        type: Sequelize.STRING,
        allowNull: false
      },
      location: {
        type: Sequelize.GEOMETRY('POINT'),
        allowNull: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
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
    return queryInterface.dropTable('shops')
  }
}
