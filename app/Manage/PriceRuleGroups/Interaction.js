import React from 'react'
// import Immutable from 'immutable'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Checkbox from 'material-ui/Checkbox'
import {Translate} from '../../Translation'
import PropTypes from 'prop-types'

export class Interaction extends React.Component {
  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }
  handleInputChange(e, checked) {
    var value = e.target.value
    var multi = false
    if (e.target.name !== 'name') {
      value = (checked && 1) || 0
      multi = e.target.name !== 'simpleSum'
    }
    this.props.change({field: e.target.name, value}, multi)
  }
  handleSave() {
    var fieldValues = this.props.fieldValues.toJS()
    fieldValues.simpleSum = (fieldValues.simpleSum && 1) || 0
    this.props.save(Object.assign(
      {},
      fieldValues,
      {priceRulesSelected: this.props.priceRulesSelected.map((v) => (parseInt(v)))}
    ), this.props.priceRuleGroupId)
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
        <Checkbox
          label={<Translate id='Simple sum' />}
          name='simpleSum'
          checked={!!this.props.fieldValues.get('simpleSum')}
          onCheck={this.handleInputChange}
        />
        <hr />
        {(this.props.priceRules || []).map((el, idx) => {
          return (<Checkbox
            key={idx}
            label={el.get('name')}
            name={el.get('id').toString()}
            checked={this.props.priceRulesSelected.indexOf(el.get('id').toString()) >= 0}
            onCheck={this.handleInputChange}
          />)
        })}
      </Dialog>
    )
  }
}

Interaction.propTypes = {
  opened: PropTypes.bool,
  priceRuleGroupId: PropTypes.number,
  add: PropTypes.func,
  edit: PropTypes.func,
  change: PropTypes.func,
  save: PropTypes.func,
  title: PropTypes.string,
  fieldValues: PropTypes.object,
  priceRulesSelected: PropTypes.array,
  priceRules: PropTypes.object
}
