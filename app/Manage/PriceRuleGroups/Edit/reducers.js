import {actionList} from './actions'
import {Map, fromJS, List} from 'immutable'
const defState = Map()
  .set('fieldValues', Map())
  .set('priceRulesSelected', List())
  .set('priceRules', List())
  .set('priceRuleId', 0)
  .set('fetchTriggerId', 0)

export const priceRuleGroupsEdit = (state = defState, action) => {
  switch (action.type) {
    case actionList.SAVE:
      if (action.status === 'received' && !action.err) {
        return defState
          .set('fetchTriggerId', state.get('fetchTriggerId') + 1)
          .set('opened', false)
      }
      break
    case actionList.EDIT:
      if (!action.priceRuleGroupId) {
        return defState
      } else if (action.status === 'received') {
        var result = fromJS(action.data)
        return state
          .update('opened', (v) => (!v))
          .set('priceRuleGroupId', action.priceRuleGroupId)
          .set('fieldValues', result.get('PriceRuleGroup').delete('enabled').delete('id').delete('addedAt').delete('priceRules'))
          .set('priceRules', result.get('PriceRules'))
          .set('priceRulesSelected', result
            .getIn(['PriceRuleGroup', 'priceRules'])
            .map((v) => (v.get('id').toString()))
          )
      }
      return state
    case actionList.CHANGE:
      if (!action.multi) {
        return state
          .setIn(['fieldValues', action.params.field], action.params.value)
      }
      if (action.params.value) {
        return state
          .update('priceRulesSelected', (v) => (v.push(action.params.field)))
      }
      return state
        .update('priceRulesSelected', (v) => v.filter((val, idx) => (val !== action.params.field)))
  }
  return state
}
