'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('priceRules', [
      {id: 1, rule: '<', ruleValueFrom: 10.00, ruleValueTo: 0.00, percentage: 10.00, hardValue: 1.25, addedAt: new Date()},
      {id: 2, rule: 'between', ruleValueFrom: 10.01, ruleValueTo: 20.00, percentage: 20.00, hardValue: 0.00, addedAt: new Date()},
      {id: 3, rule: '>', ruleValueFrom: 20.00, ruleValueTo: 0.00, percentage: 20.00, hardValue: 0.00, addedAt: new Date()}
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
