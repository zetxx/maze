export const actionList = {
  FETCH: Symbol('FETCH')
};

export const quantityTypes = (state = {}, action) => {
  if (action.type === actionList.FETCH) {
    return Object.assign({}, state, {status: action.status, data: action.data})
  }
  return state
}
