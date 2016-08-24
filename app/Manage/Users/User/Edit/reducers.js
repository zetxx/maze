import {actionList} from './actions'
import Immutable from 'immutable'
const defState = Immutable.Map().set('data', Immutable.Map({email: '', userName: ''})).set('fetchTriggerId', 0)

export const userEdit = (state = defState, action) => {
  switch (action.type) {
    case actionList.EDIT:
      return state
        .set('opened', !state.get('opened'))
        .set('data', defState.get('data'))
        .set('userId', (!state.get('opened')) ? action.userId : 0)
    case actionList.SAVE:
      if (action.status === 'received' && !action.err) {
        return state
          .set('fetchTriggerId', state.get('fetchTriggerId') + 1)
          .set('opened', false)
          .set('data', defState.get('data'))
          .delete('userId')
      }
      break
    case actionList.GET:
      if (action.status === 'received') {
        let data = Immutable.fromJS((action.data && action.data.shift()) || {})

        return state
          .setIn(['data'], data.delete('roles'))
          .setIn(['data', 'roles'], data.get('roles').reduce((prev, cur) => {
            return prev.set(parseInt(cur.get('id')), true)
          }, Immutable.Map()))
      }
      break
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
