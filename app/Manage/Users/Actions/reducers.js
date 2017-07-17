import {actionList} from './actions'
import {Map, List, fromJS} from 'immutable'
const defState = fromJS({data: List(), fetchTriggerId: 0})

export const actions = (state = defState, action) => {
  switch (action.type) {
    case actionList.FETCH:
      if (action.status === 'received' && !action.err) {
        return state
          .update('fetchTriggerId', (v) => (v + 1))
          .set('data', action.data.reduce((prev, cur) => {
            return prev
              .push(Map({id: cur.id, description: cur.description}))
          }, List()))
      }
      break
  }
  return state
}
