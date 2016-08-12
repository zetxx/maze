export const actionList = {
  'FETCH': Symbol('FETCH'),
  'GET': Symbol('GET'),
  'ADD': Symbol('ADD'),
  'EDIT': Symbol('EDIT'),
  'SAVE': Symbol('SAVE'),
  'DELETE': Symbol('DELETE')
}

export const fetch = () => ({
  type: actionList.FETCH,
  httpRequest: {
    method: 'GET',
    url: '/api/roles',
    json: true
  }
})

export const get = (id) => ({
  type: actionList.GET,
  httpRequest: {
    method: 'GET',
    url: `/api/role/${id}`,
    json: true
  }
})

export const add = () => ({
  type: actionList.ADD
})

export const edit = (id) => ({
  type: actionList.EDIT,
  httpRequest: {
    method: 'GET',
    url: `/api/role/${id}`,
    json: true
  }
})

export const save = (params, id) => ({
  type: actionList.SAVE,
  httpRequest: {
    method: 'POST',
    url: id ? `/api/role/${id}` : '/api/role',
    body: params,
    json: true
  }
})
