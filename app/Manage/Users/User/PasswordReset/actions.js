export const actionList = {
  'TOGGLE': Symbol('TOGGLE'),
  'RESET': Symbol('RESET')
}

export const toggle = (id) => ({type: actionList.TOGGLE, id})
export const reset = ({id, password}) => ({
  type: actionList.GET,
  httpRequest: {
    method: 'POST',
    url: `/api/user/passwordReset/${id}`,
    body: {password},
    json: true
  }
})
