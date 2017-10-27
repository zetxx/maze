import {actionList} from './actions'
import Immutable from 'immutable'
const defState = Immutable.fromJS({values: {password: '', repeatedPassword: ''}, same: false, opened: false, id: 0})

export const passwordReset = (state = defState, action) => {
  if (action.type === actionList.TOGGLE) {
    if (state.get('opened')) {
      return defState
    }

    return state
      .update('opened', (v) => (!v))
      .update('id', () => action.id)
  } else if (action.type === actionList.CHANGE) {
    state = state
      .setIn(['values', action.data.name], action.data.value)
    return state
      .update('same', () => {
        var a = state.getIn(['values', 'password'])
        var b = state.getIn(['values', 'repeatedPassword'])
        return a !== '' && a === b
      })
  } else if (action.type === actionList.RESET && action.status === 'received') {
    return defState
  }
  return state
}
