import {productCatAdd, productCategories} from './Management/ProductCat/reducers.js'

export default {
  productCatAdd,
  productCategories,
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
