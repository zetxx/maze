import React from 'react'
// import Immutable from 'immutable'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import DropDownMenu from 'material-ui/DropDownMenu/DropDownMenu'
import MenuItem from 'material-ui/MenuItem/MenuItem'
import {Translate} from '../../Translation'
import PropTypes from 'prop-types'

export class Interaction extends React.Component {
  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }
  handleInputChange(e, idx, value) {
    if (value) {
      return value !== '-' && this.props.change({field: 'rule', value})
    }
    this.props.change({field: e.target.name, value: e.target.value})
  }
  handleSave() {
    this.props.save(this.props.fieldValues.toJS(), this.props.priceRuleId)
  }
  handleCancel() {
    (this.props.edit || this.props.add)()
  }
  render() {
    // debugger
    return (
      <Dialog
        title={<h3><Translate id={this.props.title || ''} /></h3>}
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
        open={!!this.props.opened}
        onRequestClose={this.props.edit || this.props.add}
      >
        <TextField
          floatingLabelText={<Translate id='Name' />}
          onChange={this.handleInputChange}
          value={(this.props.fieldValues && this.props.fieldValues.get('name')) || ''}
          name='name'
        />

        <TextField
          floatingLabelText={<Translate id='From Value' />}
          onChange={this.handleInputChange}
          value={(this.props.fieldValues && this.props.fieldValues.get('ruleValueFrom')) || ''}
          name='ruleValueFrom'
        />
        <TextField
          floatingLabelText={<Translate id='To Value' />}
          onChange={this.handleInputChange}
          value={(this.props.fieldValues && this.props.fieldValues.get('ruleValueTo')) || ''}
          name='ruleValueTo'
        />
        <TextField
          floatingLabelText={<Translate id='Percentage' />}
          onChange={this.handleInputChange}
          value={(this.props.fieldValues && this.props.fieldValues.get('percentage')) || ''}
          name='percentage'
        />
        <TextField
          floatingLabelText={<Translate id='Hard Value' />}
          onChange={this.handleInputChange}
          value={(this.props.fieldValues && this.props.fieldValues.get('hardValue')) || ''}
          name='hardValue'
        /><br />
        <DropDownMenu value={(this.props.fieldValues && this.props.fieldValues.get('rule')) || '-'} name='rule' onChange={this.handleInputChange}>
          <MenuItem value='-' key={0} primaryText='Select' />
          <MenuItem value='<' key={1} primaryText='Lower Than' />
          <MenuItem value='>' key={2} primaryText='Greater Than' />
          <MenuItem value='between' key={3} primaryText='Between' />
        </DropDownMenu>
      </Dialog>
    )
  }
}

Interaction.propTypes = {
  opened: PropTypes.bool,
  priceRuleId: PropTypes.number,
  add: PropTypes.func,
  edit: PropTypes.func,
  change: PropTypes.func,
  save: PropTypes.func,
  title: PropTypes.string,
  fieldValues: PropTypes.object
}
