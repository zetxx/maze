import React from 'react'
// import Immutable from 'immutable'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Translate} from '../../../../Translation'
import TextField from 'material-ui/TextField'
import {reset, toggle, handleInputChange} from './actions'
import PropTypes from 'prop-types'
import createClass from 'create-react-class'

export const PasswordReset = createClass({
  propTypes: {
    reset: PropTypes.func,
    toggle: PropTypes.func,
    handleInputChange: PropTypes.func
  },
  handleReset() {
    this.props.reset({id: this.props.passwordReset.get('id'), password: this.props.passwordReset.getIn(['values', 'password'])})
  },
  handleInputChange(e) {
    this.props.handleInputChange({name: e.target.name, value: e.target.value})
  },
  render() {
    return (
      <Dialog
        title={<h3><Translate id='Reset Password' /></h3>}
        actions={[
          <FlatButton
            label={<Translate id='Cancel' />}
            primary
            onTouchTap={this.props.toggle}
          />,
          <FlatButton
            label={<Translate id='Reset' />}
            disabled={!this.props.same}
            primary
            keyboardFocused
            onTouchTap={this.handleReset}
          />
        ]}
        modal={false}
        open={this.props.opened}
        onRequestClose={this.props.toggle}
      >
        <TextField
          floatingLabelText={<Translate id='Password' />}
          value={this.props.passwordReset.getIn(['values', 'password'])}
          onChange={this.handleInputChange}
          name='password'
        />
        <span>&nbsp;</span>
        <TextField
          floatingLabelText={<Translate id='Repeat password' />}
          onChange={this.handleInputChange}
          value={this.props.passwordReset.getIn(['values', 'repeatedPassword'])}
          name='repeatedPassword'
        />
      </Dialog>
    )
  }
})

export default connect(
  (state) => {
    return {
      passwordReset: state.passwordReset,
      opened: !!state.passwordReset.get('opened'),
      same: state.passwordReset.get('same')
    }
  },
  {reset, toggle, handleInputChange}
)(PasswordReset)
