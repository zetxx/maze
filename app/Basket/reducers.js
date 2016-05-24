const basketDef = {
  products: [],
  id: undefined,
  name: ''
}

export const basket = (state = basketDef, action) => {
  if (action.type === 'NEW_BASKET') {
    return Object.assign({}, state, basketDef, {clearBasket: true, isNew: false})
  }
  if (action.type === 'CLOSE_BASKET' && action.status === 'received') {
    return Object.assign({}, state, basketDef, {clearBasket: true, isNew: false})
  }
  if (action.type === 'BASKET_FETCH') {
    if (action.status === 'received') {
      return Object.assign({}, state, {
        isNew: !state.id && !action.data.length,
        id: action.data[0].basketId,
        name: action.data[0].basket.name,
        products: action.data.map((data) => {
          return {
            transaction: {id: data.id, quantity: data.quantity},
            repository: {price: data.repository.price, quantityType: data.repository.quantityType},
            product: data.repository.product
          }
        })
      })
    }
  }
  if (action.type === 'BASKET_ADD') {
    if (action.status === 'received') {
      return Object.assign({}, state, {
        isNew: !state.id && !action.data.length,
        id: action.data[0].basketId,
        name: action.data[0].basket.name,
        products: action.data.map((data) => {
          return {
            transaction: {id: data.id, quantity: data.quantity},
            repository: {price: data.repository.price, quantityType: data.repository.quantityType},
            product: data.repository.product
          }
        })
      })
    }
  }
  return state
}
