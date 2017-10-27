import {actionList} from './actions'
import Immutable from 'immutable'
const defState = Immutable.map({values: {password: '', repeatedPassword: ''}, same: false})

export const passwordReset = (state = defState, action) => {
  return state
}
