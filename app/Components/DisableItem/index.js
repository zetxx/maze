import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog/Dialog'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import {close} from './reducers'
// import {TranslateHTML} from '../Translation'

export class DisableItem extends React.Component {
  disable() {
    return () => {
      this.props.disable({
        url: this.props.url,
        method: this.props.method,
        id: this.props.id,
        item: this.props.item
      })
    }
  }
  close() {
    return () => (this.props.close(this.props.item))
  }
  render() {
    const actions = [
      <FlatButton
        label='Cancel'
        primary
        onTouchTap={this.close()}
      />,
      <FlatButton
        label='OK'
        primary
        onTouchTap={this.disable()}
      />
    ]

    return (
      <Dialog style={{zIndex: 9999}} title={this.props.title} modal open={this.props.open} actions={actions}>
        {this.props.body}
      </Dialog>
    )
  }
}

DisableItem.propTypes = {
  url: PropTypes.string,
  item: PropTypes.string,
  method: PropTypes.string,
  id: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
  open: PropTypes.bool,
  disable: PropTypes.func,
  close: PropTypes.func
}

export default connect(
  (state, props) => {
    return {
      open: state.disableItem.getIn([props.item, 'open']) || false,
      title: state.disableItem.getIn([props.item, 'title']) || '',
      body: state.disableItem.getIn([props.item, 'body']) || '',
      url: state.disableItem.getIn([props.item, 'url']) || '',
      method: state.disableItem.getIn([props.item, 'method']) || '',
      id: state.disableItem.getIn([props.item, 'id'])
    }
  },
  {close}
)(DisableItem)
