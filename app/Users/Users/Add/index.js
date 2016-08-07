import React from 'react'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
// import RaisedButton from 'material-ui/RaisedButton'
// import {Card} from 'material-ui/Card'
// import {Translate} from '../../../Translation'
// import FlatButton from 'material-ui/FlatButton/FlatButton'
import {save} from './actions'

export const Add = React.createClass({
  propTypes: {
    opened: React.PropTypes.bool,
    roles: React.PropTypes.object,
    save: React.PropTypes.func
  },
  getDefaultProps() {
    return {
      opened: false
    }
  },
  render() {
    return (
      <Dialog
        title='Dialog With Actions'
        actions={[
          <FlatButton
            label='Cancel'
            primary
            onTouchTap={this.toggle}
          />,
          <FlatButton
            label='Submit'
            primary
            keyboardFocused
            onTouchTap={this.toggle}
          />
        ]}
        modal={false}
        open={this.props.opened}
        onRequestClose={this.toggle}
      >
          alabala
      </Dialog>
    )
  }
})

export default connect(
  (state) => ({roles: state.roles, opened: state.add.opened}),
  {save}
)(Add)
