const basketListDef = {data: []}

export const basketList = (state = basketListDef, action) => {
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
