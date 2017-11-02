const users = require('./app/Manage/Users/User/model')
const PriceRules = require('./app/Manage/PriceRules/model')
const PriceRuleGroupBinding = require('./app/Manage/PriceRuleGroupBinding/model')

const UserPriceRuleGroup = require('./app/Manage/UserPriceRuleGroup/model')
const PriceRuleGroup = require('./app/Manage/PriceRuleGroups/model')
const roles = require('./app/Manage/Users/Roles/model')
const userRoles = require('./app/Manage/Users/UserRoles/model')

users.belongsToMany(roles, {through: userRoles})
roles.belongsToMany(users, {through: userRoles})

users.belongsToMany(PriceRuleGroup, {through: UserPriceRuleGroup})
PriceRuleGroup.belongsToMany(users, {through: UserPriceRuleGroup})

PriceRules.belongsToMany(PriceRuleGroup, {through: PriceRuleGroupBinding})
PriceRuleGroup.belongsToMany(PriceRules, {through: PriceRuleGroupBinding})

var u = users.findAll({
  include: [{
    model: PriceRuleGroup,
    include: [{
      model: PriceRules
    }]
  }]
})
u.then(console.log)
u.catch(console.errro)
