import React from 'react'
import Product from './Product'
import ProductCat from './ProductCat'
import {connect} from 'react-redux'
import AppBar from 'material-ui/AppBar/AppBar'

const managementBar = React.createClass({
  propTypes: {
    toggleMainMenu: React.PropTypes.func
  },
  render() {
    return (
      <AppBar
        title={<span>Management</span>}
        onLeftIconButtonTouchTap={this.props.toggleMainMenu}
      />
    )
  }
})

const ManagementBar = connect(
  null,
  {
    toggleMainMenu: () => ({type: 'MAIN_MENU_TOGGLE'})
  }
)(managementBar)

export default class Management extends React.Component {
  render() {
    return (
      <div>
        <ManagementBar />
        <Product />
        <br />
        <ProductCat />
      </div>
    )
  }
}
