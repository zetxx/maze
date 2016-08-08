export const actionList = {
  'GET': Symbol('GET'),
  'ADD': Symbol('ADD'),
  'CHANGE': Symbol('CHANGE'),
  'SAVE': Symbol('SAVE')
}

export const get = (id) => ({
  type: actionList.GET,
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

export const add = () => ({
  type: actionList.ADD
})

export const change = (params) => ({
  type: actionList.CHANGE,
  params
})
