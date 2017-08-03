import {Map, List, fromJS} from 'immutable'
import {actionList as productActionList} from '../Manage/Product/reducers'
export const actionList = {
  ADD: Symbol('ADD'),
  UPLOAD: Symbol('UPLOAD')
};

const defaultUploadFileState = fromJS({list: [], uploadedList: []})

export const uploadFiles = (state = defaultUploadFileState, action) => {
  if (action.type === productActionList.TOGGLE_ADD) {
    return defaultUploadFileState
  }
  if (action.type === actionList.ADD) {
    return state.set('list', action.filesData.reduce((coll, cur) => (coll.push(cur)), List()))
  }
  if (action.type === actionList.UPLOAD && action.status === 'received') {
    return state.set('uploadedList', fromJS(action.data))
  }
  return state
}
