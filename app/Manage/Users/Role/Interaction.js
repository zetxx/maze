import React from 'react'
import Avatar from 'material-ui/Avatar'
import IconAllowed from 'material-ui/svg-icons/action/thumb-up'
import {green300 as colorAllowed, red300 as colorNotAllowed} from 'material-ui/styles/colors'
// import Immutable from 'immutable'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Translate} from '../../../Translation'
import Chip from 'material-ui/Chip'
import PropTypes from 'prop-types'

const actionBoxStyle = {float: 'left', margin: '0 2px 5px 2px'}
const actionBoxIconStyle = {cursor: 'pointer'}
const permissionStyles = {
  permAllowed: {chipBg: colorAllowed, iconHover: colorNotAllowed, avatarColor: colorAllowed, avatarBg: '#e0e0e0'},
  permNotAllowed: {chipBg: colorNotAllowed, iconHover: '#ccc', avatarColor: colorNotAllowed, avatarBg: '#e0e0e0'},
  permNotSet: {chipBg: '#ccc', iconHover: colorAllowed, avatarColor: '#ccc', avatarBg: '#e0e0e0'}
}

export const Permission = React.createClass({
  propTypes: {
    handleChange: PropTypes.func,
    description: PropTypes.string.isRequired,
    value: PropTypes.oneOf([1, 2]),
    id: PropTypes.number.isRequired
  },
  getColorStyles() {
    if (this.props.value === 1) {
      return permissionStyles['permAllowed']
    } else if (this.props.value === 2) {
      return permissionStyles['permNotAllowed']
    }
    return permissionStyles['permNotSet']
  },
  handleChange() {
    var value
    switch (this.props.value) {
      case 1:
        value = 2
        break
      case 2:
        break
      default:
        value = 1
        break
    }
    this.props.handleChange(this.props.id, value)
  },
  render() {
    let colorStyles = this.getColorStyles()
    return (
      <Chip style={actionBoxStyle} backgroundColor={colorStyles.chipBg}>
        <Avatar icon={<IconAllowed hoverColor={colorStyles.iconHover} style={actionBoxIconStyle} onTouchTap={this.handleChange} />} color={colorStyles.avatarColor} backgroundColor={colorStyles.avatarBg} />
        {this.props.description}
      </Chip>
    )
  }
})

Permission.defaultProps = {
  title: ''
}

export const Interaction = React.createClass({
  propTypes: {
    opened: PropTypes.bool,
    roleId: PropTypes.number,
    actions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string
    })),
    add: PropTypes.func,
    edit: PropTypes.func,
    change: PropTypes.func,
    save: PropTypes.func,
    title: PropTypes.string,
    name: PropTypes.string,
    permissions: PropTypes.object
  },
  componentWillReceiveProps(newProps) {
    if (newProps.opened && !this.props.opened) {
      newProps.fetch()
      if (newProps.get && newProps.roleId !== this.props.roleId) {
        newProps.get(newProps.roleId)
      }
    }
  },
  handleChange(field, id, state) {
    this.props.change({field, id, state})
  },
  handleInputChange(e) {
    this.handleChange(e.target.name, undefined, e.target.value)
  },
  handlePermissionChange(id, state) {
    this.handleChange('permission', id, state)
  },
  handleSave() {
    this.props.save({
      permissions: Object.keys(this.props.permissions).map((actionId) => ({actionId, permission: this.props.permissions[actionId]})),
      name: this.props.name
    }, this.props.roleId)
  },
  handleCancel() {
    (this.props.edit || this.props.add)()
  },
  render() {
    return (
      <Dialog
        title={<h3><Translate id={this.props.title} /></h3>}
        actions={[
          <FlatButton
            label={<Translate id='Cancel' />}
            primary
            onTouchTap={this.handleCancel}
          />,
          <FlatButton
            label={<Translate id='Save' />}
            primary
            keyboardFocused
            onTouchTap={this.handleSave}
          />
        ]}
        modal={false}
        open={this.props.opened}
        onRequestClose={this.props.edit || this.props.add}
      >
        <h3><Translate id='Role' /></h3>
        <TextField
          floatingLabelText={<Translate id='Name' />}
          onChange={this.handleInputChange}
          value={this.props.name}
          name='name'
        />
        <br />
        <h3><Translate id='Actions' /></h3>
        {this.props.actions.map((data, k) => {
          return (
            <Permission value={(this.props.permissions && this.props.permissions[data.id])} description={data.description} id={data.id} key={k} handleChange={this.handlePermissionChange} />
          )
        })}
      </Dialog>
    )
  }
})

Interaction.defaultProps = {
  title: '',
  opened: false,
  name: '',
  permissions: {}
}
