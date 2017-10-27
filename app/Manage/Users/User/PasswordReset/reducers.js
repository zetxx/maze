import {actionList} from './actions'
import Immutable from 'immutable'
const defState = Immutable.map({password: '', same: false})

export const passwordReset = (state = defState, action) => {
  return state
}
