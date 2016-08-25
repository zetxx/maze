export const actionList = {
  'FETCH': Symbol('FETCH')
}

export const fetch = () => ({
  type: actionList.FETCH,
  httpRequest: {
    method: 'GET',
    url: '/api/actions',
    json: true
  }
})
