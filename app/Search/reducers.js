export const sellSearch = (state = {data: []}, action) => {
  if (action.type === 'SEARCH' && action.status === 'received') {
    return Object.assign({}, state, {data: action.data})
  } else if (action.type === 'SEARCH_CLEAR') {
    return Object.assign({}, state, {data: []})
  }
  return Object.assign({}, state)
}
