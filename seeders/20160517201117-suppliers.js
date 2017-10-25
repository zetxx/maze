'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('suppliers', [
      {id: 1, name: 'test supplier', addedAt: new Date()}
    ], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('suppliers', null, {})
  }
}
