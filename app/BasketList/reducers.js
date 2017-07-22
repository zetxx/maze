export const actionList = {
  CLOSE: Symbol('CLOSE'),
  FETCH: Symbol('FETCH')
}
const basketListDef = {data: []}

export const basketList = (state = basketListDef, action) => {
  if (action.type === actionList.CLOSE && action.status === 'received') {
    return {data: state.data.filter((el) => (!(el.id === action.data.id)))}
  }
  if (action.type === actionList.FETCH && action.status === 'received') {
    var baskets = {}
    return Object.assign({}, state, {
      data: action.data.reduce((prev, cur) => {
        if (typeof (baskets[cur.basketId]) === 'undefined') {
          baskets[cur.basketId] = prev.push({products: [], id: cur.basket.id, name: cur.basket.name}) - 1
        }
        prev[baskets[cur.basketId]].products.push({quantity: cur.quantity, price: cur.repository.product.price, quantityType: cur.repository.product.quantityType.label, name: cur.repository.product.name})
        return prev
      }, [])
    })
  }
  return state
}
