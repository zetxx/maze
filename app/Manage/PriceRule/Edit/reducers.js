import {actionList} from './actions'
import Immutable from 'immutable'
const defState = Immutable.Map()
  .set('name', '')
  .set('roleId', 0)
  .set('fetchTriggerId', 0)
  .set('permissions', Immutable.Map())

export const roleEdit = (state = defState, action) => {
  switch (action.type) {
    case actionList.GET:
      if (action.status === 'received' && !action.err) {
        state = state
          .set('name', action.data.name)
        if (action.data.rolePermissions) {
          state = action.data.rolePermissions.reduce((accum, cur) => {
            return accum.setIn(['permissions', cur.actionId], cur.permission)
          }, state)
        }
        return state
      }
      break
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
        .set('roleId', action.roleId)
    case actionList.CHANGE:
      if (!action.params.id) { // field
        return state
          .set(action.params.field, action.params.state)
      } else { // permissions
        // state : permission; id: actionId;
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
