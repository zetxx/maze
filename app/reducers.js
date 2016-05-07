import {productCatAdd, productCategories} from './Management/ProductCat/reducers'
import {productAdd, products} from './Management/Product/reducers'
import {maze} from './Management/Maze/reducers'
import {sellSearch, quantitySelection} from './Search/reducers'

export default {
  productCatAdd,
  productCategories,
  productAdd,
  products,
  maze,
  sellSearch,
  quantitySelection,
  prefetchDialog(state = {open: false, count: 0}, action) {
    if (action.preloader === false) {
      return Object.assign({}, state)
    }
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
  },
  errorDialog(state = {open: false, errorStack: []}, action) {
    if (action.httpRequest && action.status === 'received' && action.err) {
      var newState = Object.assign({}, state, {open: true})
      newState.errorStack.push(action.err)
      return newState
    } else if (action.type === 'CLEANUP_HIDE_ERRORS') {
      return Object.assign({}, state, {open: false, errorStack: []})
    }
    return Object.assign({}, state)
  }
}
