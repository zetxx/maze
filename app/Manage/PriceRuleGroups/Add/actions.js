export const actionList = {
  'ADD': Symbol('ADD'),
  'CHANGE': Symbol('CHANGE'),
  'SAVE': Symbol('SAVE')
}

export const save = (params) => ({
  type: actionList.SAVE,
  httpRequest: {
    method: 'POST',
    url: '/api/priceRuleGroups',
    body: params,
    json: true
  }
})

export const add = () => ({
  type: actionList.ADD,
  httpRequest: {
    method: 'GET',
    url: '/api/priceRules',
    json: true
  }
})

export const change = (params, multi) => ({
  type: actionList.CHANGE,
  params,
  multi
})
