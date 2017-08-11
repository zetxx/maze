import React from 'react'
import {connect} from 'react-redux'
import Paper from 'material-ui/Paper'
import Delete from 'material-ui/svg-icons/action/delete'
import {Translate} from '../../Translation'
import {actionList} from './reducers'

const FileList = React.createClass({
  propTypes: {
    items: React.PropTypes.array,
    deletedItems: React.PropTypes.array,
    edit: React.PropTypes.func
  },
  toggle(itemId) {
    return () => {
      this.props.toggleFile(itemId)
    }
  },
  render() {
    return (
      <div>
        <ul style={{padding: '0', margin: '0', clear: 'both', display: 'block', overflow: 'hidden'}}>
          {this.props.items.filter((i) => (i.contentType.indexOf('image') > -1)).map((item, idx) => {
            return (<li style={{width: '80px', height: '80px', marginRight: '5px', position: 'relative', listStyleType: 'none', display: 'inline-block'}} key={idx}>
              <Paper style={{width: '80px', height: '80px', marginRight: '5px'}} zDepth={3}>
                <img src={`/api/files/image/${item.id}/80x80`} alt={item.name} />
              </Paper>
              <Delete style={{zIndex: 2, position: 'absolute', top: '0', right: '0'}} onTouchTap={this.toggle(item.id)}/>
              <div style={{zIndex: this.props.deletedItems.indexOf(item.id), opacity: '0.7', position: 'absolute', top: '0', right: '0', width: '80px', height: '80px', background: '#ccc'}} />
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
    deletedItems: state.configFileListSelection.deletedItems
  }),
  {
    toggleFile(itemId) {
      return {type: actionList.TOGGLE, itemId}
    }
  }
)(FileList)
