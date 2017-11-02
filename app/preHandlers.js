const users = require('./Manage/Users/User/model')
const PriceRules = require('./Manage/PriceRules/model')
const UserPriceRuleGroup = require('./Manage/UserPriceRuleGroup/model')
const PriceRuleGroupBinding = require('./Manage/PriceRuleGroupBinding/model')
const PriceRuleGroup = require('./Manage/PriceRuleGroup/model')

users.belongsToMany(PriceRuleGroup, {through: UserPriceRuleGroup})
PriceRuleGroup.belongsToMany(users, {through: UserPriceRuleGroup})

PriceRules.belongsToMany(PriceRuleGroup, {through: PriceRuleGroupBinding})
PriceRuleGroup.belongsToMany(PriceRules, {through: PriceRuleGroupBinding})

module.exports = [{
  assign: 'user',
  method: function(request, next) {
    users
      .find({
        attributes: ['id', 'userName', 'email', 'shopId'],
        include: [{
          attributes: ['id', 'simpleSum'],
          model: PriceRuleGroup,
          include: [{
            attributes: ['id', 'name', 'rule', 'ruleValueFrom', 'ruleValueTo', 'percentage', 'hardValue'],
            model: PriceRules
          }]
        }]
      }, {where: {id: 1}})
      .then((r) => {
        next(r.toJSON())
      })
  }
}]
