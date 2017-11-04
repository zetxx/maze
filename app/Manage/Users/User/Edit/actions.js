export const actionList = {
  'EDIT': Symbol('EDIT'),
  'CHANGE': Symbol('CHANGE'),
  'SAVE': Symbol('SAVE')
}

export const save = (params, id) => ({
  type: actionList.SAVE,
  httpRequest: {
    method: 'PUT',
    url: `/api/user/${id}`,
    body: {
      roles: params.roles,
      priceRules: params.priceRules,
      email: params.email
    },
    json: true
  }
})

export const edit = (userId) => ({
  type: actionList.EDIT,
  userId: userId,
  httpRequest: {
    method: 'GET',
    url: `/api/user/${userId}`,
    json: true
  }
})

export const change = (params) => ({
  type: actionList.CHANGE,
  params
})
