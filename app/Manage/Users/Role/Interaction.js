import React, {PropTypes} from 'react'
// import Immutable from 'immutable'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Translate} from '../../../Translation'

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
    get: PropTypes.func,
    change: PropTypes.func,
    save: PropTypes.func,
    title: PropTypes.string
  },
  componentWillReceiveProps(newProps) {
    if (newProps.get && newProps.opened && newProps.roleId !== this.props.roleId) {
      newProps.get(newProps.roleId)
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
        <div>k</div>
      </Dialog>
    )
  }
})

Interaction.defaultProps = {
  title: '',
  opened: false
}
