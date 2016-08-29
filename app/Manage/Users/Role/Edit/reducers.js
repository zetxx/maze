import {actionList} from './actions'
import Immutable from 'immutable'
const defState = Immutable.Map()
  .set('name', '')
  .set('roleId', 0)
  .set('fetchTriggerId', 0)
  .set('permissions', Immutable.Map())

export const roleEdit = (state = defState, action) => {
  switch (action.type) {
    case actionList.SAVE:
      if (action.status === 'received' && !action.err) {
        return defState
          .set('fetchTriggerId', state.get('fetchTriggerId') + 1)
          .set('opened', false)
      }
      break
    case actionList.EDIT:
      return defState
        .set('opened', !state.get('opened'))
    case actionList.CHANGE:
      if (!action.params.id) { // field
        return state
          .set(action.params.field, action.params.state)
      } else { // permissions
        let newState = state
          .setIn(['permissions', action.params.id], action.params.state)
        if (!action.params.state) {
          return newState
            .deleteIn(['permissions', action.params.id])
        } else {
          return newState
        }
      }
  }
  return state
}
