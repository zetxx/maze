import {actionList} from './actions'
import {Map, fromJS, List} from 'immutable'
const defState = Map()
  .set('data', Map({email: '', userName: ''}))
  .set('fetchTriggerId', 0)
  .set('priceRuleGroups', List())

export const userAdd = (state = defState, action) => {
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
      if (action.status === 'received') {
        return defState
          .set('opened', !state.get('opened'))
          .set('priceRuleGroups', fromJS(action.data))
      }
      return state
    case actionList.CHANGE:
debugger
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
