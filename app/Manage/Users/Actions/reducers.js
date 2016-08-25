import {actionList} from './actions'
import Immutable from 'immutable'
const defState = Immutable.Map().set('data', Immutable.Map()).set('fetchTriggerId', 0)

export const actions = (state = defState, action) => {
  switch (action.type) {
    case actionList.FETCH:
      if (action.status === 'received' && !action.err) {
        return state
          .set('fetchTriggerId', state.get('fetchTriggerId') + 1)
          .set('data', action.data.reduce((prev, cur) => {
            return prev
              .push(Immutable.Map({id: cur.id, description: cur.description}))
          }, Immutable.List()))
      }
      break
  }
  return state
}
