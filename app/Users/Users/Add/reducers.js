import {actionList} from './actions'
import Immutable from 'immutable'

export const add = (state = Immutable.Map(), action) => {
  switch (action.type) {
    console.log(action)
    case actionList.ADD:
      return state.set('opened', !state.get('opened'))
  }
  return state
}
