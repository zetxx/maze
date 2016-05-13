const basketListDef = {
  data: [
    // {id: 1, title: 'Klient: Go6o', productList: [{id: 120, title: 'hlqb', price: 12}, {id: 121, title: 'hlqb', price: 1}]},
    // {id: 2, title: 'Klient: Pencho', productList: [{id: 123, title: 'hlqb', price: 54}, {id: 122, title: 'hlqb', price: 122}, {id: 125, title: 'hlqb', price: 12}, {id: 126, title: 'hlqb', price: 1}]},
    // {id: 3, title: 'Klient: Dana', productList: []}
  ]
}

export const basketList = (state = basketListDef, action) => {
  if (action.type === 'FETCH_BASKETS' && action.status === 'received') {
    var baskets = {}
    return Object.assign({}, state, {
      data: action.data.reduce((prev, cur) => {
        if (typeof (baskets[cur.basketId]) === 'undefined') {
          baskets[cur.basketId] = prev.push({products: [], id: cur.basket.id, name: cur.basket.name}) - 1
        }
        prev[baskets[cur.basketId]].products.push({quantity: cur.quantity, price: cur.maze.price, quantityType: cur.maze.quantityType, name: cur.maze.product.name})
        return prev
      }, [])
    })
  }
  return Object.assign({}, state)
}
