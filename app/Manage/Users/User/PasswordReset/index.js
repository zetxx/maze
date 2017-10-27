import React, {PropTypes} from 'react'
import Immutable from 'immutable'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Translate} from '../../../Translation'
import TextField from 'material-ui/TextField'
import RoleSelect from '../Role/Select'
import PriceRulesSelect from '../../PriceRules/Select'
import {reset, toggle, handleInputChange} from './actions'

export const PasswordReset = React.createClass({
  propTypes: {
    reset: PropTypes.func,
    toggle: PropTypes.func,
    handleInputChange: PropTypes.func
  },
  handleReset() {
    this.props.reset()
  },
  handleInputChange() {
    this.props.handleInputChange()
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

PasswordReset.defaultProps = {
  opened: false
}

export default connect(
  (state) => ({
    passwordReset: state.passwordReset
  }),
  {reset, toggle}
)(Interaction)
