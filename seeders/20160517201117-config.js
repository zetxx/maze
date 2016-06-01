'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('config', [
        {key: 'globalLanguage', value: 'en', addedAt: new Date()}
    ], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('config', null, {})
  }
}
