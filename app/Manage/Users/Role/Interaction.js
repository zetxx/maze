import React, {PropTypes} from 'react'
import Avatar from 'material-ui/Avatar'
import IconAllowed from 'material-ui/svg-icons/action/thumb-up'
import IconNotAllowed from 'material-ui/svg-icons/action/thumb-down'
import IconAllowedNotSet from 'material-ui/svg-icons/action/thumbs-up-down'
import {green300 as colorAllowed, red300 as colorNotAllowed} from 'material-ui/styles/colors'
// import Immutable from 'immutable'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Translate} from '../../../Translation'
import Chip from 'material-ui/Chip'
const actionBoxStyle = {float: 'left', margin: '0 2px 5px 2px'}
const actionBoxIconStyle = {cursor: 'pointer'}

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
        {this.props.actions.map((el, k) => {
          return (
            <Chip style={actionBoxStyle} key={k} backgroundColor={colorAllowed}>
              <Avatar icon={<IconAllowed hoverColor={colorNotAllowed} style={actionBoxIconStyle} />} color={colorAllowed} backgroundColor='#e0e0e0' />
              {el['description']}
            </Chip>
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
