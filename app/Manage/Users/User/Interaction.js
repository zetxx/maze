import React, {PropTypes} from 'react'
import Immutable from 'immutable'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Translate} from '../../../Translation'
import TextField from 'material-ui/TextField'
import RoleSelect from '../Role/Select'

export const Interaction = React.createClass({
  propTypes: {
    opened: PropTypes.bool,
    userId: PropTypes.number,
    roles: PropTypes.object,
    userDetails: PropTypes.object,
    add: PropTypes.func,
    edit: PropTypes.func,
    get: PropTypes.func,
    change: PropTypes.func,
    save: PropTypes.func,
    userName: PropTypes.string,
    title: PropTypes.string,
    email: PropTypes.string
  },
  componentWillReceiveProps(newProps) {
    if (newProps.get && newProps.opened && newProps.userId !== this.props.userId) {
      newProps.get(newProps.userId)
    }
  },
  handleChange(field, id, state) {
    this.props.change({field, id, state})
  },
  handleInputChange(e) {
    this.handleChange(e.target.name, undefined, e.target.value)
  },
  render() {
    console.log(this.props.userDetails.get('userName'))
    return (
      <Dialog
        title={<h3><Translate id={this.props.title} /></h3>}
        actions={[
          <FlatButton
            label={<Translate id='Cancel' />}
            primary
            onTouchTap={this.props.edit || this.props.add}
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
        onRequestClose={this.props.edit || this.props.add}
      >
        <h3><Translate id='Details' /></h3>
        <TextField
          floatingLabelText={<Translate id='User Name' />}
          defaultValue={this.props.userDetails.get('userName')}
          onChange={this.handleInputChange}
          name='userName'
        />
        <span>&nbsp;</span>
        <TextField
          floatingLabelText={<Translate id='E-mail' />}
          onChange={this.handleInputChange}
          defaultValue={this.props.userDetails.get('email')}
          name='email'
        />
        <br />
        <h3><Translate id='Roles' /></h3>
        {this.props.roles.get('data').map((v, k) => {
          return (<RoleSelect key={k} props={v} handleChange={this.handleChange} defaultChecked={!!this.props.userDetails.getIn(['role', v.get('id')])} />)
        })}
      </Dialog>
    )
  }
})

Interaction.defaultProps = {
  userName: '',
  email: '',
  title: '',
  roles: Immutable.Map({}).set('data', []),
  userDetails: Immutable.Map({}),
  opened: false
}
