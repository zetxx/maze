import {actionList} from './actions'
import Immutable from 'immutable'

export const user = (state = {}, action) => {
  return state
}

export const users = (state = Immutable.Map(), action) => {
  if (action.type === actionList.LIST && action.status === 'received') {
    return state
      .set('status', action.status)
      .set('data', Immutable.fromJS(action.data).map((v, k) => {
        return v.set('roles', v.get('roles').reduce((prev, cur) => {
          return prev.push(cur.get('name'))
        }, Immutable.List()).join(', '))
      }))
  }
  return state
}
