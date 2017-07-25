'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('repositories', [
      {id: 2, productId: 1, shopId: 1, quantity: 10.0, addedAt: '2016-04-30 21:05:03'},
      {id: 4, productId: 2, shopId: 1, quantity: 2.0, addedAt: '2016-05-03 19:39:27'},
      {id: 6, productId: 3, shopId: 1, quantity: 10.0, addedAt: '2016-05-06 14:02:36'}
    ], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('repositories', null, {})
  }
}
