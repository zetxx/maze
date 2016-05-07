import React from 'react'
import {connect} from 'react-redux'
import Menu from 'material-ui/Menu/Menu'
import MenuItem from 'material-ui/MenuItem/MenuItem'
const menuStyle = {
  position: 'absolute',
  left: '5px',
  top: '67px',
  boxSizing: 'border-box',
  boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
  borderRadius: '2px',
  zIndex: 1,
  background: 'white',
  width: '600px'
}

const SearchResults = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    clearSearch: React.PropTypes.func,
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
      <Menu style={menuStyle} ref='menu' animateds desktop initiallyKeyboardFocused onItemTouchTap={this.handleSelect}>
        {this.props.data.map((data, idx) => {
          return (
            <MenuItem key={idx} value={data} primaryText={<b>{data.name}</b>} secondaryText={data.price + '/' + data.quantityType} />
          )
        })}
      </Menu>
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
