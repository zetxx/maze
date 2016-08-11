import {actionList} from './actions'
import Immutable from 'immutable'

export const userEdit = (state = Immutable.Map().set('data', Immutable.Map()), action) => {
  switch (action.type) {
    case actionList.EDIT:
      return state.set('opened', !state.get('opened')).delete('data').set('userId', (!state.get('opened')) ? action.userId : '')
    case actionList.GET:
      if (action.status === 'received') {
        let data = Immutable.fromJS((action.data && action.data.shift()) || {})
        return state
          .setIn(['data'], data)
          .setIn(['data', 'role'], data.get('roles').reduce((prev, cur) => {
            return prev.set(cur.get('id'), true)
          }, Immutable.Map()))
      }
      break
    case actionList.CHANGE:
        // debugger
      if (action.params.id === undefined) {
        return state.setIn(['data', action.params.field], action.params.state)
      } else if (action.params.id) {
        return state
          .setIn(
            ['data', action.params.field, action.params.id],
            !state.getIn(['data', action.params.field, action.params.id])
          )
      }
  }
  return state
}
