import {actionList} from './actions'
import {Map} from 'immutable'
const defState = Map()
  .set('fetchTriggerId', 0)
  .set('fieldValues', Map())

export const priceRuleAdd = (state = defState, action) => {
  switch (action.type) {
    case actionList.SAVE:
      if (action.status === 'received' && !action.err) {
        return defState
          .set('fetchTriggerId', state.get('fetchTriggerId') + 1)
          .set('opened', false)
      }
      break
    case actionList.ADD:
      return defState
        .set('opened', !state.get('opened'))
    case actionList.CHANGE:
      return state
        .setIn(['fieldValues', action.params.field], action.params.value)
  }
  return state
}
