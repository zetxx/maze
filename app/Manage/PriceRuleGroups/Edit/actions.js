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
    url: `/api/priceRuleGroups/${id}`,
    body: params,
    json: true
  }
})

export const edit = (priceRuleGroupId) => {
  return {
    type: actionList.EDIT,
    httpRequest: priceRuleGroupId ? {
      method: 'GET',
      url: `/api/priceRuleGroups/${priceRuleGroupId}`,
      json: true
    } : undefined,
    priceRuleGroupId
  }
}

export const change = (params, multi) => ({
  type: actionList.CHANGE,
  params,
  multi
})
