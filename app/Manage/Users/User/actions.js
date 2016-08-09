export const actionList = {
  'LIST': Symbol('LIST')
}

export const list = () => ({
  type: actionList.LIST,
  httpRequest: {
    method: 'GET',
    url: '/api/users',
    json: true
  }
})
