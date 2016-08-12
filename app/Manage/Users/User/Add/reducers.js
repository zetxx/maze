import {actionList} from './actions'
import Immutable from 'immutable'
const defState = Immutable.Map().set('data', Immutable.Map({email: '', userName: ''})).set('triggerId', 0)

export const userAdd = (state = defState, action) => {
  switch (action.type) {
    case actionList.SAVE:
      if (action.status === 'received' && !action.err) {
        return state
          .set('triggerId', state.get('triggerId') + 1)
          .set('opened', false)
          .set('data', defState.get('data'))
      }
      break
    case actionList.ADD:
      return state.set('opened', !state.get('opened')).set('data', defState.get('data'))
    case actionList.CHANGE:
      if (action.params.id === undefined) {
        return state.setIn(['data', action.params.field], action.params.state)
      } else if (action.params.id) {
        if (!state.getIn(['data', action.params.field, action.params.id])) {
          return state
            .setIn(
              ['data', action.params.field, action.params.id], true
            )
        }
        return state
            .deleteIn(['data', action.params.field, action.params.id])
      }
  }
  return state
}
