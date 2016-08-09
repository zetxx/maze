export const siteConfig = (state = {}, action) => {
  if (action.type === 'FETCH_SITE_CONFIG' && action.status === 'received' && !action.err) {
    var data = action.data.reduce((prev, cur) => {
      prev[cur.key] = cur.value
      return prev
    }, {})
    return Object.assign({}, data)
  }
  return state
}

export const updatedConfig = (state = {rqId: 1}, action) => {
  if (action.type === 'UPDATE_SITE_CONFIG' && action.status === 'received' && !action.err) {
    return Object.assign({}, {data: action.data, rqId: state.rqId + 1})
  }
  return state
}
