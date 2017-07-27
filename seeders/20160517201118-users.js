'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
        {id: 1, userName: 'user1', email: 'a@mail.bg', priceRuleId: 1, shopId: 1, addedAt: '2016-04-30 19:35:15'}
    ], {})
      .catch((e) => {
        console.log(e)
        throw e
      })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {})
  }
}
