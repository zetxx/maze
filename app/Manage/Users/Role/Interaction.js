import React, {PropTypes} from 'react'
import Avatar from 'material-ui/Avatar'
import IconAllowed from 'material-ui/svg-icons/action/thumb-up'
import {green300 as colorAllowed, red300 as colorNotAllowed} from 'material-ui/styles/colors'
// import Immutable from 'immutable'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Translate} from '../../../Translation'
import Chip from 'material-ui/Chip'
const actionBoxStyle = {float: 'left', margin: '0 2px 5px 2px'}
const actionBoxIconStyle = {cursor: 'pointer'}
const permissionStyles = {
  permAllowed: {chipBg: colorAllowed, iconHover: colorNotAllowed, avatarColor: colorAllowed, avatarBg: '#e0e0e0'},
  permNotAllowed: {chipBg: colorNotAllowed, iconHover: '#ccc', avatarColor: colorNotAllowed, avatarBg: '#e0e0e0'},
  permNotSet: {chipBg: '#ccc', iconHover: colorNotAllowed, avatarColor: '#ccc', avatarBg: '#e0e0e0'}
}

export const Permission = React.createClass({
  propTypes: {
    description: PropTypes.string.isRequired,
    value: PropTypes.oneOf([1, -1])
  },
  getColorStyles() {
    if (this.props.value === 1) {
      return permissionStyles['permAllowed']
    } else if (this.props.value === -1) {
      return permissionStyles['permNotAllowed']
    }
    return permissionStyles['permNotSet']
  },
  render() {
    let colorStyles = this.getColorStyles()
    return (
      <Chip style={actionBoxStyle} backgroundColor={colorStyles.chipBg}>
        <Avatar icon={<IconAllowed hoverColor={colorStyles.iconHover} style={actionBoxIconStyle} />} color={colorStyles.avatarColor} backgroundColor={colorStyles.avatarBg} />
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
    fetch: PropTypes.func,
    edit: PropTypes.func,
    get: PropTypes.func,
    change: PropTypes.func,
    save: PropTypes.func,
    title: PropTypes.string
  },
  componentWillReceiveProps(newProps) {
    if (newProps.opened && !this.props.opened) {
      newProps.fetch()
      if (newProps.get && newProps.roleId) {
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
  handleSave() {
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
        open={this.props.opened}
        onRequestClose={this.props.edit || this.props.add}
      >
        <h3><Translate id='Actions' /></h3>
        {this.props.actions.map((data, k) => {
          return (
            <Permission description={data.description} key={k} />
          )
        })}
      </Dialog>
    )
  }
})

Interaction.defaultProps = {
  title: '',
  opened: false
}
