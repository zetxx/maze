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

export const get = (id) => ({
  type: actionList.GET,
  httpRequest: {
    method: 'GET',
    url: `/api/priceRules/${id}`,
    json: true
  }
})

export const edit = (roleId) => ({
  type: actionList.EDIT,
  roleId
})

export const change = (params) => ({
  type: actionList.CHANGE,
  params
})
