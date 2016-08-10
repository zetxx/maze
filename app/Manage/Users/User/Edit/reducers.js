import {actionList} from './actions'
import Immutable from 'immutable'

export const userEdit = (state = Immutable.Map().set('data', Immutable.Map()), action) => {
  switch (action.type) {
    case actionList.EDIT:
      return state.set('opened', !state.get('opened')).delete('data').set('userId', (!state.get('opened')) ? action.userId : '')
    case actionList.CHANGE:
      if (action.params.id === undefined) {
        return state.setIn(['data', action.params.field], action.params.state)
      } else if (action.params.id) {
        if (action.params.state) {
          return state.setIn(['data', action.params.field, action.params.id], action.params.state)
        } else {
          return state.deleteIn(['data', action.params.field, action.params.id])
        }
      }
  }
  return state
}
