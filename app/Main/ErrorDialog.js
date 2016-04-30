import React from 'react'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog/Dialog'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import {errorParser} from '../Helpers.js'

class ErrorDialog extends React.Component {
  render() {
    const actions = [
      <FlatButton
        label='OK'
        primary
        onTouchTap={this.props.cleanup}
      />
    ]

    return (
      <Dialog title='ERROR STACK BELOW' modal open={this.props.errorDialog.open} actions={actions}>
        {this.props.errorDialog.errorStack.map((err, idx) => {
          return errorParser(err, idx)
        })}
      </Dialog>
    )
  }
}

ErrorDialog.propTypes = {
  cleanup: React.PropTypes.func,
  errorDialog: React.PropTypes.object
}

export default connect(
  (state) => ({errorDialog: state.errorDialog}),
  {
    cleanup(problems) {
      return {type: 'CLEANUP_HIDE_ERRORS', problems}
    }
  }
)(ErrorDialog)
