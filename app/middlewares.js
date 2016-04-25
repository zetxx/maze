import httpRequest from 'browser-request'
import Promise from 'bluebird'

export const request = (store) => (next) => (action) => {
  if (action.httpRequest && typeof (action.httpRequest) === 'object') {
    action.status = 'sent'
    var p = new Promise((resolve, reject) => {
      httpRequest(action.httpRequest, (err, resp) => {
        if (err) {
          return reject(err)
        }
        return resolve(resp)
      })
    })

    p
      .then((res) => {
        action.data = res.body
      })
      .catch((err) => {
        action.err = err
      })
      .finally(() => {
        action.status = 'received'
        next(action)
      })
  }
  next(action)
}
