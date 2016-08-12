import {actionList} from './actions'
import Immutable from 'immutable'

export const role = (state = {}, action) => {
  return state
}

export const roles = (state = Immutable.Map({}).set('data', []), action) => {
  if (action.type === actionList.FETCH && action.status === 'received') {
    return state
      .set('status', action.status)
      .set('data', Immutable.fromJS(action.data))
  }
  return state
}
