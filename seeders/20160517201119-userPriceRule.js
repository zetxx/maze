'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('userPriceRule', [
      {id: 1, priceRuleId: 1, userId: 1, addedAt: new Date()},
      {id: 2, priceRuleId: 2, userId: 1, addedAt: new Date()},
      {id: 3, priceRuleId: 3, userId: 1, addedAt: new Date()}
    ], {})
      .catch((e) => {
        console.log(e)
        throw e
      })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('userPriceRule', null, {})
  }
}
