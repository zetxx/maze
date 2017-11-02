import {actionList} from './actions'
import {Map, fromJS} from 'immutable'
const defState = Map()
  .set('fieldValues', Map())
  .set('priceRuleId', 0)
  .set('fetchTriggerId', 0)

export const priceRuleEdit = (state = defState, action) => {
  switch (action.type) {
    case actionList.SAVE:
      if (action.status === 'received' && !action.err) {
        return defState
          .set('fetchTriggerId', state.get('fetchTriggerId') + 1)
          .set('opened', false)
      }
      break
    case actionList.EDIT:
      if (!action.priceRuleId) {
        return defState
      } else if (action.status === 'received') {
        return state
          .update('opened', (v) => (!v))
          .set('priceRuleId', action.priceRuleId)
          .set('fieldValues', fromJS(action.data).delete('enabled').delete('id').delete('addedAt'))
      }
      return state
    case actionList.CHANGE:
      return state
        .setIn(['fieldValues', action.params.field], action.params.value)
  }
  return state
}
