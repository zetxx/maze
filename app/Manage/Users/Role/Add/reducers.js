import {actionList} from './actions'
import Immutable from 'immutable'
const defState = Immutable.Map()
  .set('name', '')
  .set('permissions', Immutable.Map())

export const roleAdd = (state = defState, action) => {
  switch (action.type) {
    case actionList.SAVE:
      if (action.status === 'received' && !action.err) {
        return state
          .set('fetchTriggerId', state.get('fetchTriggerId') + 1)
          .set('opened', false)
          .set('data', defState.get('data'))
      }
      break
    case actionList.ADD:
      return state.set('opened', !state.get('opened')).set('data', defState.get('data'))
    case actionList.CHANGE:
      if (!action.params.id) { // field
        return state
          .set(action.params.field, action.params.state)
      } else { // permissions
        return state
          .setIn(['permissions', action.params.id], action.params.state)
      }
  }
  return state
}
