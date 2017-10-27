import React from 'react'
import {connect} from 'react-redux'
import Paper from 'material-ui/Paper'
import Delete from 'material-ui/svg-icons/action/delete'
import Default from 'material-ui/svg-icons/action/done'
import Avatar from 'material-ui/Avatar'
import Attachment from 'material-ui/svg-icons/file/attachment'
import FileFolder from 'material-ui/svg-icons/file/folder'
// import {Translate} from '../../Translation'
import {actionList} from './reducers'
import PropTypes from 'prop-types'
import createClass from 'create-react-class'

const FileList = createClass({
  propTypes: {
    items: PropTypes.array,
    deletedItems: PropTypes.array,
    toggleDefault: PropTypes.func,
    defaultFile: PropTypes.number,
    edit: PropTypes.func
  },
  toggle(itemId) {
    return () => {
      this.props.toggleFile(itemId)
    }
  },
  toggleDefault(itemId) {
    return () => {
      this.props.toggleDefault(itemId)
    }
  },
  render() {
    return (
      <div>
        <ul style={{padding: '0', margin: '0', clear: 'both', display: 'block', overflow: 'hidden'}}>
          {this.props.items.map((item, idx) => {
            return (<li style={{width: '80px', height: '80px', marginRight: '5px', position: 'relative', listStyleType: 'none', display: 'inline-block'}} key={idx}>
              <Paper style={{width: '80px', height: '80px', marginRight: '5px'}} zDepth={3}>
                {
                  (item.contentType.indexOf('image') > -1)
                    ? <img src={`/api/files/image/${item.id}/80x80`} alt={item.name} />
                    : <Avatar icon={<Attachment />} size={80} style={{'float': 'left'}} />
                }
              </Paper>
              <Delete style={{zIndex: 2, position: 'absolute', top: '0', right: '0', cursor: 'pointer'}} onTouchTap={this.toggle(item.id)} />
              {(item.contentType.indexOf('image') > -1) ? <Default style={{zIndex: (this.props.defaultFile === item.id ? -2 : 2), position: 'absolute', top: '0', left: '0', cursor: 'pointer'}} onTouchTap={this.toggleDefault(item.id)} /> : ''}
              <div style={{zIndex: this.props.deletedItems.indexOf(item.id), opacity: '0.7', position: 'absolute', top: '0', right: '0', width: '80px', height: '80px', background: '#ccc'}} />
              <a href={`/api/files/${item.id}`} target='_blank' style={{position: 'absolute', bottom: 0, lefft: 0}}><FileFolder /></a>
            </li>)
          })}
        </ul>
        <hr />
      </div>
    )
  }
})

export default connect(
  (state) => ({
    items: state.configFileListSelection.items,
    defaultFile: state.configFileListSelection.isDefault,
    deletedItems: state.configFileListSelection.deletedItems
  }),
  {
    toggleFile(itemId) {
      return {type: actionList.TOGGLE, itemId}
    },
    toggleDefault(itemId) {
      return {type: actionList.TOGGLE_DEFAULT, itemId}
    }
  }
)(FileList)
