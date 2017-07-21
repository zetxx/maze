import {productCatAdd, productCategories} from './Manage/ProductCat/reducers'
import {supplierAdd, suppliers} from './Manage/Supplier/reducers'
import {productAdd, products} from './Manage/Product/reducers'
import {repository} from './Manage/Repository/reducers'
import {storeProductSearch, quantitySelection} from './StoreProductSearch/reducers'
import {basket} from './Basket/reducers'
import {heading} from './Heading/reducers'
import {basketList} from './BasketList/reducers'
import {siteConfig, updatedConfig} from './Manage/Config/reducers'
import {shops, shopAdd} from './Manage/Config/Shop/reducers'
import {role, roles} from './Manage/Users/Roles/reducers'
import {user, users} from './Manage/Users/User/reducers'
import {userAdd} from './Manage/Users/User/Add/reducers'
import {userEdit} from './Manage/Users/User/Edit/reducers'
import {userRoles} from './Manage/Users/UserRoles/reducers'
import {roleAdd} from './Manage/Users/Role/Add/reducers'
import {roleEdit} from './Manage/Users/Role/Edit/reducers'
import {actions} from './Manage/Users/Actions/reducers'
import {quantityTypes} from './Manage/QuantityType/reducers'

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
  shops,
  shopAdd,
  roles,
  role,
  users,
  user,
  userAdd,
  userEdit,
  userRoles,
  roleAdd,
  roleEdit,
  actions,
  supplierAdd,
  suppliers,
  quantityTypes,
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
      return {open: false, errorStack: []}
    }
    return state
  }
}
