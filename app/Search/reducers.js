var d = [
  {title: 'morkvi', quantityType: 'piece', price: 3.50},
  {title: 'karofi', quantityType: 'kg', price: 3.10},
  {title: 'hlqb', quantityType: 'kg', price: 1.05},
  {title: 'marulqk', quantityType: 'g', price: 1.10}
]
export const sellSearch = (state = {open: true, data: d}, action) => {
  return Object.assign({}, state)
}
