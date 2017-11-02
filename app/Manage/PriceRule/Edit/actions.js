export const actionList = {
  'GET': Symbol('GET'),
  'EDIT': Symbol('EDIT'),
  'CHANGE': Symbol('CHANGE'),
  'SAVE': Symbol('SAVE')
}

export const save = (params, id) => ({
  type: actionList.SAVE,
  httpRequest: {
    method: 'PUT',
    url: `/api/priceRules/${id}`,
    body: params,
    json: true
  }
})

export const edit = (priceRuleId) => ({
  type: actionList.EDIT,
  httpRequest: priceRuleId ? {
    method: 'GET',
    url: `/api/priceRules/${priceRuleId}`,
    json: true
  } : undefined,
  priceRuleId
})

export const change = (params) => ({
  type: actionList.CHANGE,
  params
})
