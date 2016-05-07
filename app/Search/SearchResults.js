import React from 'react'
import {connect} from 'react-redux'
import Menu from 'material-ui/Menu/Menu'
import MenuItem from 'material-ui/MenuItem/MenuItem'
import Popover from 'material-ui/Popover'

const SearchResults = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    clearSearch: React.PropTypes.func,
    getPosition: React.PropTypes.func,
    quantitySelectToggle: React.PropTypes.func,
    focus: React.PropTypes.func,
    open: React.PropTypes.bool
  },
  handleSelect(a, b, idx) {
    this.props.quantitySelectToggle(this.props.data[idx])
    this.props.clearSearch()
  },
  render() {
    if (!this.props.data || !this.props.data.length) {
      return false
    }

    return (
      <Popover open style={this.props.getPosition()}>
        <Menu ref='menu' animateds desktop initiallyKeyboardFocused onItemTouchTap={this.handleSelect}>
          {this.props.data.map((data, idx) => {
            return (
              <MenuItem key={idx} value={data} primaryText={<b>{data.name}</b>} secondaryText={data.price + '/' + data.quantityType} />
            )
          })}
        </Menu>
      </Popover>
    )
  }
})


export default connect(
  (state) => (state.sellSearch),
  {
    clearSearch() {
      return {type: 'SEARCH_CLEAR'}
    },
    quantitySelectToggle(product) {
      return {type: 'QUANTITY_SELECT_TOGGLE', product: product}
    }
  }
)(SearchResults)
