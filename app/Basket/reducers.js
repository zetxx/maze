const basketDef = {
  products: [],
  id: undefined,
  name: ''
}

export const basket = (state = basketDef, action) => {
  if (action.type === 'BASKED_ADD') {
    if (action.status === 'received') {
      return Object.assign({}, state, {
        isNew: !state.id,
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
  return Object.assign({}, state)
}
