export const siteConfig = (state = {}, action) => {
  if (action.type === 'FETCH_SITE_CONFIG' && action.status === 'received') {
    return Object.assign({}, action.data[0])
  }
  return state
}
