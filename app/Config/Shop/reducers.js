export const shopAdd = (state = {open: false, canceled: false, fieldError: {}}, action) => {
  if (action.type === 'TOGGLE_SHOP_ADD') {
    return Object.assign({}, state, {open: !state.open, canceled: !!action.canceled, fieldError: {}})
  } else if (action.type === 'SHOP_ADD') {
    if (action.data && action.status === 'received') {
      return Object.assign({}, state, {open: !state.open, canceled: false, fieldError: {}})
    }
  } else if (action.type === 'SHOP_ADD_VALIDATION_PROBLEM') {
    return Object.assign({}, state, {fieldError: action.problems})
  }
  return state
}

export const shops = (state = {}, action) => {
  if (action.type === 'FETCH_SHOPS') {
    return Object.assign({}, state, {status: action.status, data: action.data})
  }
  return state
}
