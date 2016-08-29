export const actionList = {
  'EDIT': Symbol('EDIT'),
  'CHANGE': Symbol('CHANGE'),
  'SAVE': Symbol('SAVE')
}

export const save = (params, id) => ({
  type: actionList.SAVE,
  httpRequest: {
    method: 'PUT',
    url: `/api/role/${id}`,
    body: params,
    json: true
  }
})

export const edit = () => ({
  type: actionList.EDIT
})

export const change = (params) => ({
  type: actionList.CHANGE,
  params
})
