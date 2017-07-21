'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('repository', [
      {id: 4, productId: 2, shopId: 1, quantity: 2.0, addedAt: '2016-05-03 19:39:27'},
      {id: 2, productId: 1, shopId: 2, quantity: 10.0, addedAt: '2016-04-30 21:05:03'},
      {id: 3, productId: 1, shopId: 2, quantity: 10.0, addedAt: '2016-04-30 21:05:03'},
      {id: 5, productId: 2, shopId: 2, quantity: 3.0, addedAt: '2016-05-03 19:39:27'},
      {id: 6, productId: 3, shopId: 3, quantity: 10.0, addedAt: '2016-05-06 14:02:36'},
      {id: 7, productId: 4, shopId: 2, quantity: 5.0, addedAt: '2016-05-06 14:02:36'},
      {id: 8, productId: 5, shopId: 1, quantity: 20.0, addedAt: '2016-05-06 14:02:36'},
      {id: 9, productId: 6, shopId: 3, quantity: 30.0, addedAt: '2016-05-06 14:02:36'},
      {id: 10, productId: 7, shopId: 1, quantity: 55.0, addedAt: '2016-05-06 14:39:13'},
      {id: 11, productId: 8, shopId: 3, quantity: 35.0, addedAt: '2016-05-06 14:39:13'},
      {id: 12, productId: 6, shopId: 3, quantity: 1.0, addedAt: '2016-05-09 21:18:08'}
    ], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('repository', null, {})
  }
}
