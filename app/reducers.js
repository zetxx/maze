import {productCatAdd, productCategories} from './ProductManagement/ProductCat/reducers'
import {productAdd, products} from './ProductManagement/Product/reducers'
import {repository} from './ProductManagement/Repository/reducers'
import {storeProductSearch, quantitySelection} from './StoreProductSearch/reducers'
import {basket} from './Basket/reducers'
import {heading} from './Heading/reducers'
import {basketList} from './BasketList/reducers'
import {siteConfig, updatedConfig} from './Config/reducers'

export default {
  updatedConfig,
  productCatAdd,
  productCategories,
  productAdd,
  products,
  repository,
  storeProductSearch,
  quantitySelection,
  basket,
  basketList,
  siteConfig,
  heading,
  prefetchDialog(state = {open: false, count: 0}, action) {
    if (action.preloader === false) {
      return state
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
    return state
  },
  errorDialog(state = {open: false, errorStack: []}, action) {
    if (action.httpRequest && action.status === 'received' && action.err) {
      var newState = Object.assign({}, state, {open: true})
      newState.errorStack.push(action.err)
      return newState
    } else if (action.type === 'CLEANUP_HIDE_ERRORS') {
      return Object.assign({}, state, {open: false, errorStack: []})
    }
    return state
  }
}
