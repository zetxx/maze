export default {
  productCategories(state = {}, action) {
    if (action.type === 'FETCH_PRODUCT_CATEGORIES') {
      return Object.assign({}, state, {status: action.status, data: action.data})
    }
    return Object.assign({}, state)
  },
  prefetchDialog(state = {open: false}, action) {
    if (action.httpRequest) {
      if (action.status === 'sent') {
        return Object.assign({}, state, {open: true})
      } else if (action.status === 'received') {
        return Object.assign({}, state, {open: false})
      }
    }
    return Object.assign({}, state)
  }
}
