import React from 'react'
import {connect} from 'react-redux'
import {Translate} from '../Translation'
import Dropzone from 'react-dropzone'
import {actionList} from './reducers'

class Upload extends React.Component {
  constructor(props) {
    super(props)
    this.onDrop = this.onDrop.bind(this)
    this.droppedFiles = this.droppedFiles.bind(this)
  }
  onDrop(files) {
    this.props.add(files)
  }
  droppedFiles(uploadFilesList) {
    if(uploadFilesList.length) {
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
    );
  }
}

Upload.propTypes = {
  upload: React.PropTypes.func,
  add: React.PropTypes.func,
  uploadFilesList: React.PropTypes.array
}

export default connect(
  (state) => {
    return {uploadFilesList: state.uploadFiles.get('list').toJS()};
  },
  {
    add(filesData) {
      return {type: actionList.ADD, filesData}
    }
  }
)(Upload)