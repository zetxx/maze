import {productCatAdd, productCategories} from './Management/ProductCat/reducers.js'
import {productAdd, products, maze} from './Management/Product/reducers.js'

export default {
  productCatAdd,
  productCategories,
  productAdd,
  products,
  maze,
  prefetchDialog(state = {open: false, count: 0}, action) {
    if (action.httpRequest) {
      if (action.status === 'sent') {
        return Object.assign({}, state, {open: true, count: state.count + 1})
      } else if (action.status === 'received') {
        var count = state.count - 1
        if (count <= 0) {
          return Object.assign({}, state, {open: false, count: count})
        }
        return Object.assign({}, state, {count: count})
      }
    }
    return Object.assign({}, state)
  }
}
