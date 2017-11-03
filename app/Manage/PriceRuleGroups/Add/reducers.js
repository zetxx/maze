import {actionList} from './actions'
import {Map, fromJS, List} from 'immutable'
const defState = Map()
  .set('fetchTriggerId', 0)
  .set('fieldValues', Map())
  .set('priceRulesSelected', List())
  .set('priceRules', List())

export const priceRuleGroupsAdd = (state = defState, action) => {
  switch (action.type) {
    case actionList.SAVE:
      if (action.status === 'received' && !action.err) {
        return defState
          .set('fetchTriggerId', state.get('fetchTriggerId') + 1)
          .set('opened', false)
      }
      break
    case actionList.ADD:
      if (action.status === 'received' && !action.err) {
        return defState
          .set('priceRules', fromJS(action.data))
          .set('opened', !state.get('opened'))
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
