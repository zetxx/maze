import React from 'react'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Translate} from '../../../Translation'
import {save, add} from './actions'

export const Add = React.createClass({
  propTypes: {
    opened: React.PropTypes.bool,
    roles: React.PropTypes.object,
    add: React.PropTypes.func,
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
            label={<Translate id='Cancel' />}
            primary
            onTouchTap={this.props.add}
          />,
          <FlatButton
            label={<Translate id='Save' />}
            primary
            keyboardFocused
            onTouchTap={this.props.save}
          />
        ]}
        modal={false}
        open={this.props.opened}
        onRequestClose={this.props.add}
      >
          ali baba
      </Dialog>
    )
  }
})

export default connect(
  (state) => ({roles: state.roles, opened: state.add.get('opened')}),
  {save, add}
)(Add)
