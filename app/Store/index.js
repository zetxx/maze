import React from 'react'
import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
import GridList from 'material-ui/GridList/GridList'
import List from 'material-ui/List/List'
import Paper from 'material-ui/Paper'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import BasketList from '../BasketList'
import {setTitle} from '../Heading/actions'
import Search from '../StoreProductSearch'
import Basket from '../Basket'

const Sell = React.createClass({
  propTypes: {
    params: React.PropTypes.object,
    setTitle: React.PropTypes.func,
    activeBasket: React.PropTypes.object,
    newBasket: React.PropTypes.func,
    toggleNavigation: React.PropTypes.func
  },
  componentDidMount() {
    this.props.setTitle('Store')
  },
  render() {
    return (
      <GridList cols={2} padding={15}>
        <Paper zDepth={3}>
          <AppBar
            title={<FormattedMessage id='Baskets/Clients' />}
            onLeftIconButtonTouchTap={this.props.toggleNavigation}
          />
          <BasketList />
        </Paper>
        <Paper zDepth={3}>
          <AppBar
            showMenuIconButton={false}
            title={<span>{<FormattedMessage id='Basket' />}: {this.props.activeBasket.name}</span>}
            iconElementRight={<FlatButton onTouchTap={this.props.newBasket} label={<FormattedMessage id='New' />} />}
          />
          <Search />
          <List>
            <Basket basketId={parseInt(this.props.params.basketId, 10)} />
          </List>
        </Paper>
      </GridList>
    )
  }
})

export default connect(
  (state) => ({activeBasket: state.basket}),
  {
    toggleNavigation: () => ({type: 'MAIN_MENU_TOGGLE'}),
    newBasket: () => ({type: 'NEW_BASKET'}),
    setTitle
  }
)(Sell)
