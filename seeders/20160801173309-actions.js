'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('actions', [
        {id: 1, type: 'GET', uri: '/api/baskets', description: 'fetch all baskets', addedAt: '2016-04-30 19:35:15'},
        {id: 2, type: 'GET', uri: '/api/baskets/:id', description: 'fetch basket', addedAt: '2016-04-30 19:35:15'},
        {id: 3, type: 'GET', uri: '/api/products', description: 'fetch products', addedAt: '2016-04-30 19:35:15'},
        {id: 4, type: 'GET', uri: '/api/productCategories', description: 'fetch product categories', addedAt: '2016-04-30 19:35:15'}
    ], {})
      .catch((e) => {
        console.log(e)
        throw e
      })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('actions', null, {})
  }
}
