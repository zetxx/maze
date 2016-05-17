export const storeProductSearch = (state = {data: []}, action) => {
  if (action.type === 'SEARCH' && action.status === 'received') {
    return Object.assign({}, state, {data: action.data})
  } else if (action.type === 'SEARCH_CLEAR') {
    return Object.assign({}, state, {data: []})
  }
  return Object.assign({}, state)
}

export const quantitySelection = (state = {product: {}, open: false}, action) => {
  if (action.type === 'QUANTITY_SELECT_TOGGLE') {
    return Object.assign({}, state, {product: action.product || {}, open: !state.open})
  }

  return Object.assign({}, state)
}
