const basketListDef = {
  data: [
    {id: 1, title: 'Klient: Go6o', total: '150.55', productList: [{id: 120, title: 'hlqb', price: 12}, {id: 121, title: 'hlqb', price: 1}]},
    {id: 2, title: 'Klient: Pencho', total: '45.00', productList: [{id: 123, title: 'hlqb', price: 54}, {id: 122, title: 'hlqb', price: 122}, {id: 125, title: 'hlqb', price: 12}, {id: 126, title: 'hlqb', price: 1}]},
    {id: 3, title: 'Klient: Dana', total: '27.34', productList: []}
  ]
}

export const basketList = (state = basketListDef, action) => {
  return Object.assign({}, state)
}
