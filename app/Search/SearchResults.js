import React from 'react'
import {connect} from 'react-redux'
import Menu from 'material-ui/Menu/Menu'
import MenuItem from 'material-ui/MenuItem/MenuItem'
const menuStyle = {
  marginRight: 32,
  marginBottom: 32,
  float: 'left',
  position: 'relative',
  zIndex: 1
}

const SearchResults = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    open: React.PropTypes.bool
  },
  render() {
    if (!this.props.open) {
      return false
    }

    return (
      <Menu style={menuStyle}>
        {this.props.data.map((data, idx) => {
          return (
            <MenuItem key={idx} primaryText={<b>{data.title}</b>} subtitle={data.price + '/' + data.quantityType} />
          )
        })}
      </Menu>
    )
  }
})


export default connect(
  (state) => (state.sellSearch)
)(SearchResults)
