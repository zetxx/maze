export const actionList = {
  'LIST': Symbol('LIST'),
  'GET': Symbol('GET'),
  'ADD': Symbol('ADD'),
  'EDIT': Symbol('EDIT'),
  'SAVE': Symbol('SAVE'),
  'DELETE': Symbol('DELETE')
}

export const list = () => ({
  type: actionList.LIST,
  httpRequest: {
    method: 'GET',
    url: '/api/users',
    json: true
  }
})

export const get = (id) => ({
  type: actionList.GET,
  httpRequest: {
    method: 'GET',
    url: `/api/user/${id}`,
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
    url: `/api/user/${id}`,
    json: true
  }
})

export const save = (params, id) => ({
  type: actionList.SAVE,
  httpRequest: {
    method: 'POST',
    url: id ? `/api/user/${id}` : '/api/user',
    body: params,
    json: true
  }
})
