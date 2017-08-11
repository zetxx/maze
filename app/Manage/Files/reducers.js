import {Map, List, fromJS} from 'immutable'
import {actionList as productsActionList} from '../Product/reducers'

export const actionList = {
  TOGGLE: Symbol('TOGGLE')
};

export const configFileListSelection = (state = {items: [], deletedItems: []}, action) => {
  if (action.type === productsActionList.FETCH_PRODUCT && action.status === 'received') {
    return Object.assign(
      {},
      state,
      {
        items: action.data.files.map((f) => (Object.assign({}, f))),
        deletedItems: []
      }
    )
  } else if (action.type === actionList.TOGGLE) {
    if (state.deletedItems.indexOf(action.itemId) > -1) {
      return Object.assign( {}, state, {deletedItems: state.deletedItems.filter((id) => id !== action.itemId)})
    }
    return Object.assign( {}, state, {deletedItems: state.deletedItems.concat(action.itemId)})
  }
  return state
}
