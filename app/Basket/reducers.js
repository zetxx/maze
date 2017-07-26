import {actionList as actionListBasketList} from '../BasketList/reducers'
export const actionList = {
  NEW: Symbol('NEW'),
  REASSIGN: Symbol('REASSIGN'),
  FETCH: Symbol('FETCH'),
  ADD: Symbol('ADD')
}
const basketDef = {
  products: [],
  id: undefined,
  direction: '',
  name: ''
}

export const basket = (state = basketDef, action) => {
  if (action.type === actionList.NEW) {
    return Object.assign({}, state, basketDef, {action: 'new'})
  }
  if (action.type === actionListBasketList.CLOSE && action.status === 'received') {
    return Object.assign({}, state, basketDef, {action: 'close'})
  }
  if (action.type === actionList.REASSIGN && action.status === 'received') {
    return Object.assign({}, state, {id: action.data.to, action: 'reassign'})
  }
  if (action.type === actionList.FETCH) {
    if (action.status === 'received') {
      return Object.assign({}, state, {
        action: 'fetch',
        direction: '',
        id: action.data.length && action.data[0].basket.id,
        name: action.data.length && action.data[0].basket.name,
        products: action.data.map((data) => {
          return {
            transaction: {id: data.id, quantity: data.quantity},
            repository: {price: data.repository.product.price, quantityType: data.repository.product.quantityType.label},
            product: data.repository.product
          }
        })
      })
    }
  }
  if (action.type === actionList.ADD) {
    if (action.status === 'received') {
      if (action.data && action.data[0]) {
        return Object.assign({}, state, {
          action: 'add',
          direction: '',
          id: action.data[0].basket.id,
          name: action.data[0].basket.name,
          products: action.data.map((data) => {
            return {
              transaction: {id: data.id, quantity: data.quantity},
              repository: {price: data.repository.product.price, quantityType: data.repository.product.quantityType.label},
              product: data.repository.product
            }
          })
        })
      }
      return state
    }
  }
  return state
}
