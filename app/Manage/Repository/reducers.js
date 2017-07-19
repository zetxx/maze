export const repository = (state = {productId: undefined, open: false, canceled: false, fieldError: {}}, action) => {
  if (action.type === 'TOGGLE_REPOSITORY_ADD') {
    return Object.assign({}, state, {productId: action.productId, open: !state.open, canceled: !!action.canceled, fieldError: {}})
  } else if (action.type === 'REPOSITORY_ADD') {
    if (action.data && action.status === 'received') {
      return Object.assign({}, state, {productId: undefined, open: !state.open, canceled: false, fieldError: {}})
    }
  } else if (action.type === 'REPOSITORY_ADD_VALIDATION_PROBLEM') {
    return Object.assign({}, state, {productId: undefined, fieldError: action.problems})
  }
  return state
}
