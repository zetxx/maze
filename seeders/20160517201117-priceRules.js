'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('priceRules', [
      {id: 1, name: 'r:<;rvf:10.00;rvt:0.00;p:10.00;hv:1.25', rule: '<', ruleValueFrom: 10.00, ruleValueTo: 0.00, percentage: 10.00, hardValue: 1.25, addedAt: new Date()},
      {id: 2, name: 'r:between;rvf:10.01;rvt:20.00;p:20.00;hv:0.00', rule: 'between', ruleValueFrom: 10.01, ruleValueTo: 20.00, percentage: 20.00, hardValue: 0.00, addedAt: new Date()},
      {id: 3, name: 'r:>,;rvf:20.00;rvt:0.00;p:20.00;hv:0.00', rule: '>', ruleValueFrom: 20.00, ruleValueTo: 0.00, percentage: 20.00, hardValue: 0.00, addedAt: new Date()}
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
