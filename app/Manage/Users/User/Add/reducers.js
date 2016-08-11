import {actionList} from './actions'
import Immutable from 'immutable'

export const userAdd = (state = Immutable.Map(), action) => {
  switch (action.type) {
    case actionList.ADD:
      return state.set('opened', !state.get('opened')).delete('data')
    case actionList.CHANGE:
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
