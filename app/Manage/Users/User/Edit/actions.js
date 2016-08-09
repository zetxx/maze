export const actionList = {
  'EDIT': Symbol('EDIT'),
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

export const edit = (userId) => ({
  type: actionList.EDIT,
  userId: (!isNaN(parseInt(userId)) ? userId : '')
})

export const change = (params) => ({
  type: actionList.CHANGE,
  params
})
