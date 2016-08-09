import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Translate} from '../../../../Translation'
import TextField from 'material-ui/TextField'
import Role from '../Role'
import {save, add, change} from './actions'

export const Add = React.createClass({
  propTypes: {
    opened: PropTypes.bool,
    roles: PropTypes.object,
    add: PropTypes.func,
    change: PropTypes.func,
    save: PropTypes.func,
    userName: PropTypes.string,
    email: PropTypes.string
  },
  handleChange(field, id, state) {
    this.props.change({field, id, state})
  },
  handleInputChange(e) {
    this.handleChange(e.target.name, undefined, e.target.value)
  },
  render() {
    return (
      <Dialog
        title={<h3><Translate id='New User Add' /></h3>}
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
        <h3><Translate id='Details' /></h3>
        <TextField
          floatingLabelText={<Translate id='User Name' />}
          onChange={this.handleInputChange}
          name='userName'
        />
        <span>&nbsp;</span>
        <TextField
          floatingLabelText={<Translate id='E-mail' />}
          onChange={this.handleInputChange}
          name='email'
        />
        <br />
        <h3><Translate id='Roles' /></h3>
        {(this.props.roles.get('data') || Immutable.Map()).map((v, k) => {
          return (<Role key={k} props={v} handleChange={this.handleChange} />)
        })}
      </Dialog>
    )
  }
})

Add.defaultProps = {
  userName: '',
  email: '',
  roles: Immutable.Map(),
  opened: false
}

export default connect(
  (state) => ({roles: state.roles, opened: state.add.get('opened')}),
  {save, add, change}
)(Add)
