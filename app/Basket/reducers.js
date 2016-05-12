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
            maze: {price: data.maze.price, quantityType: data.maze.quantityType},
            product: data.maze.product
          }
        })
      })
    }
  }
  return Object.assign({}, state)
}
