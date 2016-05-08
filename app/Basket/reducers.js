const basketDef = {
  data: [
    // {id: 1, title: 'krastavici', quantity: 0.500, price: 10.55},
    // {id: 2, title: 'hlqb', quantity: 1, price: 1.05},
    // {id: 3, title: 'morkowi', quantity: 1, price: 1.05}
  ]
}

export const basket = (state = basketDef, action) => {
  if (action.type === 'BASKED_ADD') {
    // debugger;
  }
  return Object.assign({}, state)
}
