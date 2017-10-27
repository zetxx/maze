import React from 'react'
import {connect} from 'react-redux'
import {Translate} from '../Translation'
import Dropzone from 'react-dropzone'
import {actionList} from './reducers'
import PropTypes from 'prop-types'

class Upload extends React.Component {
  constructor(props) {
    super(props)
    this.onDrop = this.onDrop.bind(this)
    this.droppedFiles = this.droppedFiles.bind(this)
  }
  onDrop(files) {
    this.props.add(files, this.props.edit)
  }
  droppedFiles(uploadFilesList) {
    if (uploadFilesList.length) {
      return (<aside>
        <h2><Translate id='Dropped files' /></h2>
        <ul>
          {this.props.uploadFilesList.map((f, idx) => <li key={idx}>{f.name} - {f.size} <Translate id='bytes' /></li>)}
        </ul>
      </aside>)
    }
    return null
  }
  render() {
    return (
      <section>
        <div>
          <Dropzone onDrop={this.onDrop}>
            <p><Translate id='Try dropping some files here' /></p>
          </Dropzone>
        </div>
        {this.droppedFiles(this.props.uploadFilesList)}
      </section>
    )
  }
}

Upload.propTypes = {
  add: PropTypes.func,
  edit: PropTypes.bool,
  uploadFilesList: PropTypes.array
}

export default connect(
  (state) => {
    return {uploadFilesList: state.uploadFiles.get('list').toJS()}
  },
  {
    add(filesData, edit) {
      return {type: edit ? actionList.EDIT : actionList.ADD, filesData}
    }
  }
)(Upload)
