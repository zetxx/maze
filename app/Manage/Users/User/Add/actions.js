export const actionList = {
  'ADD': Symbol('ADD'),
  'CHANGE': Symbol('CHANGE'),
  'SAVE': Symbol('SAVE')
}

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
