import {Map, List, fromJS} from 'immutable'
import {actionList as productActionList} from '../Manage/Product/reducers'
export const actionList = {
  ADD: Symbol('ADD'),
  EDIT: Symbol('EDIT'),
  UPLOAD: Symbol('UPLOAD'),
  EDIT_UPLOAD: Symbol('EDIT_UPLOAD')
};

function add(state, action) {
  return state.set('list', action.filesData.reduce((coll, cur) => (coll.push(cur)), List()))
}

function upload(state, action) {
  return state
  .set('uploadedList', fromJS(action.data))
  .update('uploadRequestId', (v) => (v + 1))
}

const defaultUploadFileState = fromJS({list: [], uploadedList: [], uploadRequestId: 1})

export const uploadFiles = (state = defaultUploadFileState, action) => {
  if (action.type === productActionList.TOGGLE_ADD) {
    return defaultUploadFileState
  }
  if (action.type === actionList.ADD) {
    return add(state, action)
  }
  if (action.type === actionList.UPLOAD && action.status === 'received') {
    return upload(state, action)
  }
  return state
}

export const uploadFilesEdit = (state = defaultUploadFileState, action) => {
  if (action.type === productActionList.TOGGLE_EDIT) {
    return defaultUploadFileState
  }
  if (action.type === actionList.EDIT) {
    debugger;
    return add(state, action)
  }
  if (action.type === actionList.EDIT_UPLOAD && action.status === 'received') {
    debugger;
    return upload(state, action)
  }
  return state
}
