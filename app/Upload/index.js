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
  droppedFiles() {
    var uploadFilesList = this.props.edit
      ? this.props.uploadFilesEdit
      : this.props.uploadFilesList

    if (uploadFilesList.length) {
      return (
        <aside style={{float: 'left', width: '400px'}}>
          <h2 style={{margin: '0 0 4px 0', padding: 0}}><Translate id='Dropped files' /></h2>
          <ul style={{display: 'block', margin: 0, padding: 0}}>
            {uploadFilesList.map((f, idx) => <li style={{display: 'block', margin: 0, padding: 0}} key={idx}>{f.name} - {f.size} <Translate id='bytes' /></li>)}
          </ul>
        </aside>
      )
    }
    return null
  }
  render() {
    return (
      <section>
        <div style={{float: 'left', width: '260px'}}>
          <Dropzone onDrop={this.onDrop} style={{width: '240px', height: '50px', border: '1px solid #ccc', padding: '5px', textAlign: 'center'}}>
            <p><Translate id='Try dropping some files here' /></p>
          </Dropzone>
        </div>
        {this.droppedFiles()}
      </section>
    )
  }
}

Upload.propTypes = {
  add: PropTypes.func,
  edit: PropTypes.bool,
  uploadFilesList: PropTypes.array,
  uploadFilesEdit: PropTypes.array
}

export default connect(
  (state) => {
    return {
      uploadFilesList: state.uploadFiles.get('list').toJS(),
      uploadFilesEdit: state.uploadFilesEdit.get('list').toJS()
    }
  },
  {
    add(filesData, edit) {
      return {type: edit ? actionList.EDIT : actionList.ADD, filesData}
    }
  }
)(Upload)
