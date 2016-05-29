'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('productCategory', [
      {id: 1, name: 'Тестени изделия', addedAt: '2016-04-30 19:35:15'},
      {id: 2, name: 'Плодове', addedAt: '2016-05-06 14:02:36'},
      {id: 3, name: 'Зеленчуци', addedAt: '2016-05-06 14:02:36'},
      {id: 4, name: 'Подправки', addedAt: '2016-05-06 14:02:36'},
      {id: 5, name: 'Сладкиши', addedAt: '2016-05-06 14:02:36'},
      {id: 6, name: 'Безалкохолни', addedAt: '2016-05-06 14:02:36'},
      {id: 7, name: 'Месни', addedAt: '2016-05-06 14:02:36'},
      {id: 8, name: 'Консерви', addedAt: '2016-05-06 14:02:36'},
      {id: 9, name: 'Алкохол', addedAt: '2016-05-09 21:15:58'}
    ], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('productCategory', null, {})
  }
}
