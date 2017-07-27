'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('priceRules', [
        {id: 1, rule: '>', ruleValue: 0.00, percentage: 10.00, hardValue: 1.25, addedAt: '2016-04-30 19:35:15'}
    ], {})
      .catch((e) => {
        console.log(e)
        throw e
      })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('priceRules', null, {})
  }
}
