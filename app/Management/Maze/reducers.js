export const maze = (state = {productId: undefined, open: false, canceled: false, fieldError: {}}, action) => {
  if (action.type === 'TOGGLE_MAZE_ADD') {
    return Object.assign({}, state, {productId: action.productId, open: !state.open, canceled: !!action.canceled, fieldError: {}})
  } else if (action.type === 'MAZE_ADD') {
    if (action.data && action.status === 'received') {
      return Object.assign({}, state, {productId: undefined, open: !state.open, canceled: false, fieldError: {}})
    }
  } else if (action.type === 'MAZE_ADD_VALIDATION_PROBLEM') {
    return Object.assign({}, state, {productId: undefined, fieldError: action.problems})
  }
  return Object.assign({}, state)
}
