import {Map} from 'immutable'
export const actionList = {
  OPEN: Symbol('OPEN'),
  CLOSE: Symbol('CLOSE')
}

export const open = ({item, url, method, title, body, disableAction}) => ({type: actionList.OPEN, item, url, method, title, body, disableAction})
export const close = (item) => ({type: actionList.CLOSE, item})

const defState = Map()

export const disableItem = (state = defState, action) => {
  if (action.item) {
    if (action.type === actionList.OPEN) {
      return defState
        .setIn([action.item, 'title'], action.title)
        .setIn([action.item, 'body'], action.body)
        .setIn([action.item, 'url'], action.url)
        .setIn([action.item, 'method'], action.method)
        .setIn([action.item, 'id'], action.id)
        .setIn([action.item, 'disableAction'], action.disableAction)
        .setIn([action.item, 'open'], true)
    } else if (action.type === actionList.CLOSE) {
      return state
        .delete(action.item)
    } else if (action.type === state.getIn([action.item, 'disableAction']) && action.status === 'received') {
      return state
        .delete(action.item)
        .setIn([action.item, 'open'], false)
    }
  }
  return state
}
