const users = require('./Manage/Users/User/model')
const priceRules = require('./Manage/PriceRules/model')
const userPriceRule = require('./Manage/UserPriceRule/model')
users.belongsToMany(priceRules, {through: userPriceRule})
priceRules.belongsToMany(users, {through: userPriceRule})

module.exports = [{
  assign: 'user',
  method: function(request, next) {
    users
      .find({
        attributes: ['id', 'userName', 'email', 'shopId'],
        include: [{
          model: priceRules
        }]
      }, {where: {id: 1}})
      .then((r) => {
        next(r.toJSON())
      })
  }
}]
