import {actionList} from './actions'
export const role = (state = {}, action) => {
  return state
}

export const roles = (state = {}, action) => {
  if (action.type === actionList.LIST) {
    return Object.assign({}, state, {status: action.status, data: action.data})
  }
  return state
}
