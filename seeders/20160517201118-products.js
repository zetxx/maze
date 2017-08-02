'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('products', [
        {id: 1, category: 1, supplier: 1, barcode: 11212121, quantityTypeId: 1, price: 2.0, name: 'Хляб 1кг', description: '1-но килограмов хляб', addedAt: '2016-04-30 19:35:15'},
        {id: 2, category: 1, supplier: 1, barcode: 11212121, quantityTypeId: 1, price: 12.0, name: 'Хляб 0.5кг', description: 'половин килограмов хляб', addedAt: '2016-04-30 19:35:15'},
        {id: 3, category: 1, supplier: 1, barcode: 11212121, quantityTypeId: 1, price: 22.0, name: 'Питка', description: 'Хляб тип питка', addedAt: '2016-05-06 14:02:36'},
        {id: 4, category: 1, supplier: 1, barcode: 11212121, quantityTypeId: 1, price: 8.10, name: 'Хляб черен нарязан', description: 'Хляб черен нарязан', addedAt: '2016-05-06 14:02:36'},
        {id: 5, category: 1, supplier: 1, barcode: 11212121, quantityTypeId: 1, price: 6.20, name: 'Хляб Пълнозърнест 0.5', description: 'Хляб Пълнозърнест 0.5', addedAt: '2016-05-06 14:02:36'},
        {id: 6, category: 1, supplier: 1, barcode: 11212121, quantityTypeId: 1, price: 1.40, name: 'Хляб пълнозърнест 1кг', description: 'Хляб пълнозърнест 1кг', addedAt: '2016-05-06 14:02:36'},
        {id: 7, category: 2, supplier: 1, barcode: 11212121, quantityTypeId: 2, price: 42.30, name: 'Череши', description: 'Череши', addedAt: '2016-05-06 14:02:36'},
        {id: 8, category: 1, supplier: 1, barcode: 11212121, quantityTypeId: 2, price: 2.10, name: 'Ябълки', description: 'Ябълки', addedAt: '2016-05-06 14:02:36'}
    ], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('products', null, {})
  }
}
