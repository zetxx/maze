export const actionList = {
  TOGGLE_ADD: Symbol('TOGGLE_ADD'),
  ADD: Symbol('ADD'),
  ADD_VALIDATION_PROBLEM: Symbol('ADD_VALIDATION_PROBLEM'),
  FETCH: Symbol('FETCH')
};

export const supplierAdd = (state = {open: false, canceled: false, fieldError: {}}, action) => {
  if (action.type === actionList.TOGGLE_ADD) {
    return Object.assign({}, state, {open: !state.open, canceled: !!action.canceled, fieldError: {}})
  } else if (action.type === actionList.ADD) {
    if (action.data && action.status === 'received') {
      return Object.assign({}, state, {open: !state.open, canceled: false, fieldError: {}})
    }
  } else if (action.type === actionList.ADD_VALIDATION_PROBLEM) {
    return Object.assign({}, state, {fieldError: action.problems})
  }
  return state
}

export const suppliers = (state = {}, action) => {
  if (action.type === actionList.FETCH) {
    return Object.assign({}, state, {status: action.status, data: action.data})
  }
  return state
}
