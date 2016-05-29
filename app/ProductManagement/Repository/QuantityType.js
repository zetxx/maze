import React from 'react'
import {FormattedMessage} from 'react-intl'
import DropDownMenu from 'material-ui/DropDownMenu/DropDownMenu'
import MenuItem from 'material-ui/MenuItem/MenuItem'

export default React.createClass({
  propTypes: {
    handleChange: React.PropTypes.func,
    value: React.PropTypes.number
  },
  getInitialState() {
    return {value: 'piece'}
  },
  handleChange(event, index, value) {
    this.setState({value: value})
  },
  getValue() {
    return this.state.value
  },
  render() {
    return (
      <DropDownMenu value={this.state.value} onChange={this.handleChange} ref='quantityType'>
        <MenuItem value='piece' primaryText={<FormattedMessage id='Piece' />} />
        <MenuItem value='kg' primaryText={<FormattedMessage id='Kilograms' />} />
        <MenuItem value='g' primaryText={<FormattedMessage id='grams' />} />
      </DropDownMenu>
    )
  }
})