export const navigation = (state = {open: false}, action) => {
  if (action.type === 'MAIN_MENU_TOGGLE') {
    return Object.assign({}, state, {open: !state.open})
  }
  return state
}
