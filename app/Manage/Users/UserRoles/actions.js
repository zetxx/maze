export const actionList = {
  'GET': Symbol('GET'),
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
