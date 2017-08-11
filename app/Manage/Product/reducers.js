import {Map, List, fromJS} from 'immutable'

export const actionList = {
  TOGGLE_ADD: Symbol('TOGGLE_ADD'),
  TOGGLE_EDIT: Symbol('TOGGLE_EDIT'),
  ADD: Symbol('ADD'),
  EDIT: Symbol('EDIT'),
  ADD_VALIDATION_PROBLEM: Symbol('ADD_VALIDATION_PROBLEM'),
  EDIT_VALIDATION_PROBLEM: Symbol('EDIT_VALIDATION_PROBLEM'),
  FETCH: Symbol('FETCH'),
  FETCH_PRODUCT: Symbol('FETCH_PRODUCT')
};

export const productAdd = (state = {open: false, canceled: false, fieldError: {}}, action) => {
  if (action.type === actionList.TOGGLE_ADD) {
    return Object.assign({}, state, {open: !state.open, canceled: !!action.canceled, fieldError: {}})
  } else if (action.type === actionList.ADD) {
    if (action.data && action.status === 'received') {
      return Object.assign({}, state, {open: false, canceled: false, fieldError: {}})
    }
  } else if (action.type === actionList.ADD_VALIDATION_PROBLEM) {
    return Object.assign({}, state, {fieldError: action.problems})
  }
  return state
}

export const productEdit = (state = {open: false, canceled: false, fieldError: {}, item: {}}, action) => {
  if (action.type === actionList.TOGGLE_EDIT) {
    return Object.assign({}, state, {open: !state.open, canceled: !!action.canceled, fieldError: {}, item: {}})
  } else if (action.type === actionList.FETCH_PRODUCT && action.status === 'received') {
    return Object.assign({}, state, {open: true, fieldError: {}, item: action.data})
  } else if (action.type === actionList.EDIT) {
    if (action.data && action.status === 'received') {
      return Object.assign({}, state, {open: !state.open, canceled: false, fieldError: {}, item: {}})
    }
  } else if (action.type === actionList.EDIT_VALIDATION_PROBLEM) {
    return Object.assign({}, state, {fieldError: action.problems})
  }
  return state
}

export const products = (state = {}, action) => {
  if (action.type === actionList.FETCH && action.status === 'received') {
    return Object.assign(
      {},
      state,
      {status: action.status, data: action.data}
    )
  }
  return state
}
