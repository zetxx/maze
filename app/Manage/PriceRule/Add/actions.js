export const actionList = {
  'ADD': Symbol('ADD'),
  'CHANGE': Symbol('CHANGE'),
  'SAVE': Symbol('SAVE')
}

export const save = (params) => ({
  type: actionList.SAVE,
  httpRequest: {
    method: 'POST',
    url: '/api/priceRules',
    body: params,
    json: true
  }
})

export const add = () => ({
  type: actionList.ADD
})

export const change = (params) => ({
  type: actionList.CHANGE,
  params
})
