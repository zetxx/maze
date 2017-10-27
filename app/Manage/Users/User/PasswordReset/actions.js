export const actionList = {
  'TOGGLE': Symbol('TOGGLE'),
  'RESET': Symbol('RESET'),
  'CHANGE': Symbol('CHANGE')
}

export const toggle = (id) => ({type: actionList.TOGGLE, id})
export const handleInputChange = (data) => ({type: actionList.CHANGE, data})
export const reset = ({id, password}) => ({
  type: actionList.RESET,
  httpRequest: {
    method: 'POST',
    url: `/api/user/passwordReset/${id}`,
    body: {password},
    json: true
  }
})
