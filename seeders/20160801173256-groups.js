'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('groups', [
        {id: 1, name: 'group 1', addedAt: '2016-04-30 19:35:15'},
        {id: 2, name: 'group 2', addedAt: '2016-04-30 19:35:15'}
    ], {})
      .catch((e) => {
        console.log(e)
        throw e
      })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('groups', null, {})
  }
}
