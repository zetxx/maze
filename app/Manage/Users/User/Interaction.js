import React from 'react'
import Immutable from 'immutable'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Translate} from '../../../Translation'
import TextField from 'material-ui/TextField'
import RoleSelect from '../Role/Select'
import PriceRuleGroupsSelect from '../../PriceRuleGroups/Select'
import DropDownMenu from 'material-ui/DropDownMenu/DropDownMenu'
import MenuItem from 'material-ui/MenuItem/MenuItem'
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
  handleSelectChange(name) {
    return (e, idx, value) => {
      this.handleChange(name, undefined, value)
    }
  },
  handleSave() {
    var newDetails = this.props.userDetails
      .delete('roles')
      .delete('priceRuleGroups')
      .set('roles', (this.props.userDetails.get('roles') || Immutable.Map()).keySeq())
      .set('priceRuleGroups', (this.props.userDetails.get('priceRuleGroups') || Immutable.Map()).keySeq())

    this.props.save(newDetails.toJS(), this.props.userId)
  },
  onAddEdit() {
    (this.props.edit || this.props.add)('nofetch')
  },
  render() {
    return (
      <Dialog
        title={<h3><Translate id={this.props.title} /></h3>}
        actions={[
          <FlatButton
            label={<Translate id='Cancel' />}
            primary
            onTouchTap={this.onAddEdit}
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
        onRequestClose={this.onAddEdit}
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
        <DropDownMenu value={(this.props.userDetails && this.props.userDetails.get('currency')) || 'BGN'} name='currency' onChange={this.handleSelectChange('currency')}>
          <MenuItem value='USD' key={0} primaryText='USD' />
          <MenuItem value='EUR' key={1} primaryText='EUR' />
          <MenuItem value='JPY' key={2} primaryText='JPY' />
          <MenuItem value='GBP' key={3} primaryText='GBP' />
          <MenuItem value='RUB' key={4} primaryText='RUB' />
          <MenuItem value='BGN' key={5} primaryText='BGN' />
        </DropDownMenu>
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
