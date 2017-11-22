import {actionList} from './actions'
import {Map, fromJS, List} from 'immutable'
const defState = Map()
  .set('data', Map({email: '', userName: '', currency: ''}))
  .set('fetchTriggerId', 0)
  .set('priceRuleGroups', List())

export const userEdit = (state = defState, action) => {
  switch (action.type) {
    case actionList.SAVE:
      if (action.status === 'received' && !action.err) {
        return state
          .set('fetchTriggerId', state.get('fetchTriggerId') + 1)
          .set('opened', false)
          .set('data', defState.get('data'))
          .delete('userId')
      }
      break
    case actionList.EDIT:
      if (action.status === 'received') {
        let result = fromJS(action.data)

        return state
          .set('userId', (!state.get('opened')) ? action.userId : 0)
          .set('opened', !state.get('opened'))
          .set('data', result.get('user').delete('roles').delete('priceRuleGroups'))
          .setIn(['data', 'roles'], result.getIn(['user', 'roles']).reduce((prev, cur) => {
            return prev.set(parseInt(cur.get('id')), true)
          }, Map()))
          .setIn(
            ['data', 'priceRuleGroups'],
            result.getIn(['user', 'priceRuleGroups'])
              .reduce((prev, cur) => {
                return prev.set(parseInt(cur.get('id')), true)
              }, Map())
          )
          .set('priceRuleGroups', result.get('PriceRuleGroups'))
      } else if (!action.status) {
        return defState
      }
      break
    case actionList.CHANGE:
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
