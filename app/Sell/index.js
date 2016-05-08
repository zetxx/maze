import React from 'react'
import GridList from 'material-ui/GridList/GridList'
import List from 'material-ui/List/List'
import Paper from 'material-ui/Paper'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import BasketList from '../BasketList'
import Search from '../Search'
import Basket from '../Basket'

export default class Sell extends React.Component {
  render() {
    return (
      <GridList cols={2} padding={15}>
        <Paper zDepth={3}>
          <AppBar
            title={<span>Baskets/Clients</span>}
            iconElementRight={<FlatButton label='Add new' />}
          />
          <BasketList />
        </Paper>
        <Paper zDepth={3}>
          <AppBar
            title={<span>Basket: </span>}
            iconElementRight={<FlatButton label='Assign to' />}
          />
          <Search />
          <List>
            <Basket />
          </List>
        </Paper>
      </GridList>
    )
  }
}
