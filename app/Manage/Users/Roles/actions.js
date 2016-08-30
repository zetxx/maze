export const actionList = {
  'FETCH': Symbol('FETCH'),
  'GET': Symbol('GET')
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
