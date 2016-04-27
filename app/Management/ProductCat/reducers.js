export const productCatAdd = (state = {open: false, canceled: false}, action) => {
  if (action.type === 'TOGGLE_PRODUCT_CAT_ADD') {
    return Object.assign({}, state, {open: !state.open, canceled: !!action.canceled})
  } else if (action.type === 'PRODUCT_CAT_ADD') {
    if (action.data && action.status === 'received') {
      return Object.assign({}, state, {open: !state.open, canceled: false})
    }
  }
  return Object.assign({}, state)
}

export const productCategories = (state = {}, action) => {
  if (action.type === 'FETCH_PRODUCT_CATEGORIES') {
    return Object.assign({}, state, {status: action.status, data: action.data})
  }
  return Object.assign({}, state)
}
