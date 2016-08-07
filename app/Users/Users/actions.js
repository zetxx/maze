export const actionList = {
  'LIST': Symbol('LIST'),
  'GET': Symbol('GET')
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
