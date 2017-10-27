import React from 'react'
import {connect} from 'react-redux'
import GridList from 'material-ui/GridList/GridList'
import List from 'material-ui/List/List'
import Paper from 'material-ui/Paper'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import BasketList from '../BasketList'
import {setTitle} from '../Heading/actions'
import Search from '../StoreProductSearch'
import Basket from '../Basket'
import {Translate} from '../Translation'
import {actionList} from '../Basket/reducers'
import PropTypes from 'prop-types'
import createClass from 'create-react-class'

const Sell = createClass({
  propTypes: {
    params: PropTypes.object,
    setTitle: PropTypes.func,
    activeBasket: PropTypes.object,
    newBasket: PropTypes.func,
    toggleNavigation: PropTypes.func
  },
  componentDidMount() {
    this.props.setTitle('Store')
  },
  render() {
    return (
      <GridList cols={2} padding={15}>
        <Paper zDepth={3}>
          <AppBar
            title={<Translate id='Baskets/Clients' />}
            onLeftIconButtonTouchTap={this.props.toggleNavigation}
          />
          <BasketList />
        </Paper>
        <Paper zDepth={3}>
          <AppBar
            showMenuIconButton={false}
            title={<span>{<Translate id='Basket' />}: {this.props.activeBasket.name}</span>}
            iconElementRight={<FlatButton onTouchTap={this.props.newBasket} label={<Translate id='New' />} />}
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
    newBasket: () => ({type: actionList.NEW}),
    setTitle
  }
)(Sell)
