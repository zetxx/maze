import React from 'react'
import Immutable from 'immutable'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Translate} from '../../../Translation'
import TextField from 'material-ui/TextField'
import RoleSelect from '../Role/Select'
import PriceRuleGroupsSelect from '../../PriceRuleGroups/Select'
import PropTypes from 'prop-types'
import createClass from 'create-react-class'

export const Interaction = createClass({
  propTypes: {
    opened: PropTypes.bool,
    userId: PropTypes.number,
    availableRoles: PropTypes.object,
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
  handleSave() {
    var newDetails = this.props.userDetails
      .delete('roles')
      .delete('priceRuleGroups')
      .set('roles', (this.props.userDetails.get('roles') || Immutable.Map()).keySeq())
      .set('priceRuleGroups', (this.props.userDetails.get('priceRuleGroups') || Immutable.Map()).keySeq())
    this.props.save(newDetails.toJS(), this.props.userId)
  },
  render() {
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
            onTouchTap={this.handleSave}
          />
        ]}
        modal={false}
        open={!!this.props.opened}
        onRequestClose={this.props.edit || this.props.add}
      >
        <h3><Translate id='Details' /></h3>
        <TextField
          floatingLabelText={<Translate id='User Name' />}
          value={this.props.userDetails.get('userName')}
          onChange={this.handleInputChange}
          name='userName'
        />
        <span>&nbsp;</span>
        <TextField
          floatingLabelText={<Translate id='E-mail' />}
          onChange={this.handleInputChange}
          value={this.props.userDetails.get('email')}
          name='email'
        />
        <br />
        <h3><Translate id='Roles' /></h3>
        {this.props.availableRoles.get('data').map((v, k) => {
          return (
            <RoleSelect
              key={k}
              props={v}
              handleChange={this.handleChange}
              defaultChecked={!!this.props.userDetails.getIn(['roles', parseInt(v.get('id'))])}
            />
          )
        })}
        <br />
        <h3><Translate id='Price Rule Groups' /></h3>
        {(this.props.priceRuleGroups || []).map((v, k) => {
          return (
            <PriceRuleGroupsSelect
              key={k}
              props={v}
              handleChange={this.handleChange}
              defaultChecked={!!this.props.userDetails.getIn(['priceRuleGroups', parseInt(v.get('id'))])}
            />
          )
        })}
      </Dialog>
    )
  }
})
