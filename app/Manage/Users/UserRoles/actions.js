export const actionList = {
  'GET': Symbol('GET')
}

export const get = (id) => ({
  type: actionList.GET,
  httpRequest: {
    method: 'GET',
    url: `/api/user/${id}`,
    json: true
  }
})
