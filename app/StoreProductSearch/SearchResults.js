import React from 'react'
import {TranslateHTML} from '../Translation'
import {connect} from 'react-redux'
import Menu from 'material-ui/Menu/Menu'
import MenuItem from 'material-ui/MenuItem/MenuItem'
import Popover from 'material-ui/Popover'

const SearchResults = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    clearSearch: React.PropTypes.func,
    getPosition: React.PropTypes.func,
    getTargetElement: React.PropTypes.func,
    quantitySelectToggle: React.PropTypes.func,
    focus: React.PropTypes.func,
    focusSearch: React.PropTypes.func,
    open: React.PropTypes.bool
  },
  handleSelect(a, b, idx) {
    this.props.quantitySelectToggle(this.props.data[idx])
    this.props.clearSearch()
  },
  handleRequestClose() {
    this.props.clearSearch()
    setTimeout(this.props.focusSearch, 10)
  },
  render() {
    if (!this.props.data || !this.props.data.length) {
      return false
    }

    return (
      <Popover
        anchorEl={this.props.getTargetElement()}
        anchorOrigin={{horizontal: 'left',vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left',vertical: 'top'}}
        open
        style={this.props.getPosition()}
        onRequestClose={this.handleRequestClose}>
        <Menu ref='menu' desktop initiallyKeyboardFocused onItemTouchTap={this.handleSelect}>
          {this.props.data.map((data, idx) => {
            return (
              <MenuItem key={idx} value={data} primaryText={<b>{data.name}</b>} secondaryText={<span>{data.price} <TranslateHTML id='_currency' /> '/' {data.quantityType}</span>} />
            )
          })}
        </Menu>
      </Popover>
    )
  }
})

export default connect(
  (state) => (state.storeProductSearch),
  {
    clearSearch() {
      return {type: 'SEARCH_CLEAR'}
    },
    quantitySelectToggle(product) {
      return {type: 'QUANTITY_SELECT_TOGGLE', product: product}
    }
  }
)(SearchResults)
