const basketDef = {
  products: [
    // {id: 1, title: 'krastavici', quantity: 0.500, price: 10.55},
    // {id: 2, title: 'hlqb', quantity: 1, price: 1.05},
    // {id: 3, title: 'morkowi', quantity: 1, price: 1.05}
  ],
  id: undefined,
  name: ''
}

export const basket = (state = basketDef, action) => {
  if (action.type === 'BASKED_ADD') {
    if (action.status === 'received') {
      return Object.assign({}, state, {
        isNew: !state.id,
        id: action.data.basket.id,
        name: action.data.basket.name,
        products: state.products.concat(action.data.product)
      })
    }
  }
  return Object.assign({}, state)
}
