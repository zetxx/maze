import {Map, List, fromJS} from 'immutable'

export const actionList = {
  ADD: Symbol('ADD'),
  UPLOAD: Symbol('UPLOAD')
};

const defaultUploadFileState = fromJS({list: []})

export const uploadFiles = (state = defaultUploadFileState, action) => {
  if (action.type === actionList.TOGGLE_ADD) {
    return defaultUploadFileState
  }
  if (action.type === actionList.ADD) {
    return state.set('list', action.filesData.reduce((coll, cur) => (coll.push(cur)), List()))
  }
  return state
}
