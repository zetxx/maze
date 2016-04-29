export const productCatAdd = (state = {open: false, canceled: false, fieldError: {}}, action) => {
  if (action.type === 'TOGGLE_PRODUCT_CAT_ADD') {
    return Object.assign({}, state, {open: !state.open, canceled: !!action.canceled, fieldError: {}})
  } else if (action.type === 'PRODUCT_CAT_ADD') {
    if (action.data && action.status === 'received') {
      return Object.assign({}, state, {open: !state.open, canceled: false, fieldError: {}})
    }
  } else if (action.type === 'PRODUCT_CAT_ADD_VALIDATION_PROBLEM') {
    return Object.assign({}, state, {fieldError: action.problems})
  }
  return Object.assign({}, state)
}

export const productCategories = (state = {}, action) => {
  if (action.type === 'FETCH_PRODUCT_CATEGORIES') {
    return Object.assign({}, state, {status: action.status, data: action.data})
  }
  return Object.assign({}, state)
}
