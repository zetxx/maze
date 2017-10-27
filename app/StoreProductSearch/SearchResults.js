import React from 'react'
import {TranslateHTML} from '../Translation'
import {connect} from 'react-redux'
import Menu from 'material-ui/Menu/Menu'
import MenuItem from 'material-ui/MenuItem/MenuItem'
import Popover from 'material-ui/Popover'
import {actionList} from './reducers'
import PropTypes from 'prop-types'

const SearchResults = React.createClass({
  propTypes: {
    data: PropTypes.array,
    clearSearch: PropTypes.func,
    getPosition: PropTypes.func,
    getTargetElement: PropTypes.func,
    quantitySelectToggle: PropTypes.func,
    focus: PropTypes.func,
    focusSearch: PropTypes.func,
    open: PropTypes.bool
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
              <MenuItem key={idx} value={data} primaryText={<b>{data.name}</b>} secondaryText={<span>{data.price} <TranslateHTML id='_currency' /> '/' {data.quantityType.label}</span>} />
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
      return {type: actionList.CLEAR}
    },
    quantitySelectToggle(product) {
      return {type: actionList.TOGGLE, product: product}
    }
  }
)(SearchResults)
