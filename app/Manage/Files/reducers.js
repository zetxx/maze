import {actionList as productsActionList} from '../Product/reducers'

export const actionList = {
  TOGGLE: Symbol('TOGGLE'),
  TOGGLE_DEFAULT: Symbol('TOGGLE_DEFAULT')
}

var defaultState = {items: [], deletedItems: [], isDefault: 0}

export const configFileListSelection = (state = defaultState, action) => {
  if (action.type === productsActionList.FETCH_PRODUCT && action.status === 'received') {
    return Object.assign(
      {},
      state,
      {
        items: action.data.files.map((f) => (Object.assign({}, f))),
        deletedItems: [],
        isDefault: action.data.files.filter((f) => f.isDefault).map((f) => f.id).pop() || action.data.files.filter((f) => f.contentType.indexOf('image') >= 0).map((f) => f.id).pop() || 0
      }
    )
  } else if (action.type === productsActionList.TOGGLE_ADD) {
    return {items: [], deletedItems: [], isDefault: 0}
  } else if (action.type === actionList.TOGGLE_DEFAULT) {
    return Object.assign({}, state, {isDefault: action.itemId})
  } else if (action.type === actionList.TOGGLE) {
    if (state.deletedItems.indexOf(action.itemId) > -1) {
      return Object.assign({}, state, {deletedItems: state.deletedItems.filter((id) => id !== action.itemId)})
    }
    return Object.assign({}, state, {deletedItems: state.deletedItems.concat(action.itemId)})
  }
  return state
}
