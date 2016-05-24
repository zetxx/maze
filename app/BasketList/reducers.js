const basketListDef = {data: []}

export const basketList = (state = basketListDef, action) => {
  if (action.type === 'CLOSE_BASKET' && action.status === 'received') {
    return {data: state.data.filter((el) => (!(el.id === action.data.id)))}
  }
  if (action.type === 'FETCH_BASKETS' && action.status === 'received') {
    var baskets = {}
    return Object.assign({}, state, {
      data: action.data.reduce((prev, cur) => {
        if (typeof (baskets[cur.basketId]) === 'undefined') {
          baskets[cur.basketId] = prev.push({products: [], id: cur.basket.id, name: cur.basket.name}) - 1
        }
        prev[baskets[cur.basketId]].products.push({quantity: cur.quantity, price: cur.repository.price, quantityType: cur.repository.quantityType, name: cur.repository.product.name})
        return prev
      }, [])
    })
  }
  return state
}
