import React from 'react'
import {connect} from 'react-redux'
import GridList from 'material-ui/GridList/GridList'
import List from 'material-ui/List/List'
import Paper from 'material-ui/Paper'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import BasketList from '../BasketList'
import Search from '../Search'
import Basket from '../Basket'

const Sell = React.createClass({
  propTypes: {
    activeBasket: React.PropTypes.object,
    toggleMainMenu: React.PropTypes.func
  },
  render() {
    return (
      <GridList cols={2} padding={15}>
        <Paper zDepth={3}>
          <AppBar
            title={<span>Baskets/Clients</span>}
            onLeftIconButtonTouchTap={this.props.toggleMainMenu}
          />
          <BasketList />
        </Paper>
        <Paper zDepth={3}>
          <AppBar
            showMenuIconButton={false}
            title={<span>Basket: {this.props.activeBasket.name}</span>}
            iconElementRight={<FlatButton label='New' />}
          />
          <Search />
          <List>
            <Basket />
          </List>
        </Paper>
      </GridList>
    )
  }
})

export default connect(
  (state) => ({activeBasket: state.basket}),
  {
    toggleMainMenu: () => ({type: 'MAIN_MENU_TOGGLE'})
  }
)(Sell)
