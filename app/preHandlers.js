const user = require('./Manage/Users/User/model')

module.exports = [{
  assign: 'user',
  method: function(request, next) {
    user
      .find({
        attributes: ['id', 'userName', 'email', 'priceRuleId', 'shopId']
      }, {where: {id: 1}})
      .then((r) => {
        next(r.dataValues)
      })
  }
}];
