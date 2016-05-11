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
        id: action.data.basketId,
        name: action.data.basket.name,
        products: state.products.concat({
          transaction: {id: action.data.id, quantity: action.data.quantity},
          maze: {price: action.data.maze.price, quantityType: action.data.maze.quantityType},
          product: action.data.maze.product
        })
      })
    }
  }
  return Object.assign({}, state)
}
