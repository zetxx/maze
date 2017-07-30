const user = require('./Manage/Users/User/model')
const priceRules = require('./Manage/PriceRules/model')
user.belongsTo(priceRules)
function cleanupDataObjects(data, o) {
  Object.keys(data)
      .filter((k) => (data[k] && data[k].dataValues))
      .reduce((accum, cur) => {
        o[cur] = cleanupDataObjects(data[cur], {})
        return o
      }, o)
  if (data.dataValues) {
    return Object.assign(data.dataValues, o)
  }
  return o
}

module.exports = [{
  assign: 'user',
  method: function(request, next) {
    user
      .find({
        attributes: ['id', 'userName', 'email', 'priceRuleId', 'shopId'],
        include: [{
          model: priceRules
        }]
      }, {where: {id: 1}})
      .then((r) => {
        let d = cleanupDataObjects(r, {})
        next(r.dataValues)
      })
  }
}];
