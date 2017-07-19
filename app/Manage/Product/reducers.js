export const productAdd = (state = {open: false, canceled: false, fieldError: {}}, action) => {
  if (action.type === 'TOGGLE_PRODUCT_ADD') {
    return Object.assign({}, state, {open: !state.open, canceled: !!action.canceled, fieldError: {}})
  } else if (action.type === 'PRODUCT_ADD') {
    if (action.data && action.status === 'received') {
      return Object.assign({}, state, {open: !state.open, canceled: false, fieldError: {}})
    }
  } else if (action.type === 'PRODUCT_ADD_VALIDATION_PROBLEM') {
    return Object.assign({}, state, {fieldError: action.problems})
  }
  return state
}

export const products = (state = {}, action) => {
  if (action.type === 'FETCH_PRODUCTS') {
    return Object.assign({}, state, {status: action.status, data: action.data})
  }
  return state
}
