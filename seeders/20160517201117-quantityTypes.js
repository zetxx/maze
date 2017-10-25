'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('quantityTypes', [
      {id: 1, name: 'Piece', label: 'piece', addedAt: '2016-04-30 19:35:15'},
      {id: 2, name: 'Kilo', label: 'kg', addedAt: '2016-04-30 19:35:15'},
      {id: 3, name: 'Grams', label: 'g', addedAt: '2016-04-30 19:36:15'}
    ], {})
      .catch((e) => {
        console.log(e)
        throw e
      })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('quantityTypes', null, {})
  }
}
