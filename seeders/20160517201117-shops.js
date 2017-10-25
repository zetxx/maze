'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('shops', [
      {id: 1, workingHours: '1-20', workingDays: 'm-f', name: 'Shop 1', description: '-', addedAt: '2016-04-30 19:35:15'},
      {id: 2, workingHours: '1-20', workingDays: 'm-f', name: 'Shop 2', description: '-', addedAt: '2016-04-30 19:35:15'},
      {id: 3, workingHours: '1-20', workingDays: 'm-f', name: 'Shop 3', description: '-', addedAt: '2016-05-06 14:02:36'}
    ], {})
      .catch((e) => {
        console.log(e)
        throw e
      })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('shops', null, {})
  }
}
