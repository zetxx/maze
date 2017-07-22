export const actionList = {
  FETCH: Symbol('FETCH'),
  CLEAR: Symbol('CLEAR'),
  TOGGLE: Symbol('TOGGLE')
}

export const storeProductSearch = (state = {data: []}, action) => {
  if (action.type === actionList.FETCH && action.status === 'received') {
    return Object.assign({}, state, {data: action.data})
  } else if (action.type === actionList.CLEAR) {
    return Object.assign({}, state, {data: []})
  }
  return state
}

export const quantitySelection = (state = {product: {}, open: false}, action) => {
  if (action.type === actionList.TOGGLE) {
    return Object.assign({}, state, {product: action.product || {}, open: !state.open})
  }

  return state
}
