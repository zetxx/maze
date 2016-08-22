export const actionList = {
  'EDIT': Symbol('EDIT'),
  'CHANGE': Symbol('CHANGE'),
  'GET': Symbol('GET'),
  'SAVE': Symbol('SAVE')
}

export const save = (params, id) => ({
  type: actionList.SAVE,
  httpRequest: {
    method: 'PUT',
    url: `/api/user/${id}`,
    body: {
      roles: params.roles,
      email: params.email
    },
    json: true
  }
})

export const edit = (userId) => ({
  type: actionList.EDIT,
  userId: (!isNaN(parseInt(userId)) ? userId : '')
})

export const change = (params) => ({
  type: actionList.CHANGE,
  params
})

export const get = (id) => ({
  type: actionList.GET,
  httpRequest: {
    method: 'GET',
    url: `/api/user/${id}`,
    json: true
  }
})
