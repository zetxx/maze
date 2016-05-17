import React from 'react'
import { storiesOf } from '@kadira/storybook'
import List from 'material-ui/List/List'
import Paper from 'material-ui/Paper'
import Search from '../../app/StoreProductSearch'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import Basket from '../../app/Basket'
import BasketList from '../../app/BasketList'
import Sell from '../../app/Sell'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const Main = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },
  propTypes: {
    children: React.PropTypes.object
  },
  getChildContext() {
    return {muiTheme: getMuiTheme()}
  },
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
})

var basketList = [
  {id: 1, title: 'krastavici', quantity: '0.500', price: 10.55},
  {id: 2, title: 'hlqb', quantity: '1', price: 1.05},
  {id: 3, title: 'morkowi', quantity: '1', price: 1.05}
]
var baskeGrouptList = [
  {id: 1, title: 'Klient: Go6o', total: '150.55', productList: [{id: 120, title: 'hlqb', price: 12}, {id: 121, title: 'hlqb', price: 1}]},
  {id: 2, title: 'Klient: Pencho', total: '45.00', productList: [{id: 123, title: 'hlqb', price: 54}, {id: 122, title: 'hlqb', price: 122}, {id: 125, title: 'hlqb', price: 12}, {id: 126, title: 'hlqb', price: 1}]},
  {id: 3, title: 'Klient: Dana', total: '27.34', productList: []}
]

storiesOf('maza', module)
.add('Basket + product search', () => (
  <Main>
    <Paper zDepth={3}>
      <Search />
      <List>
        <Basket data={basketList} />
      </List>
    </Paper>
  </Main>
))
.add('Baskets group list', () => (
  <Main>
    <Paper zDepth={3}>
      <AppBar
        title={<span>Groups</span>}
        iconElementRight={<FlatButton label='Add new' />}
      />
      <div>
        {baskeGrouptList.map((el, idx) => (idx % 2 ? <BasketList key={idx} data={el} /> : <BasketList key={idx} selectState data={el} />))}
      </div>
    </Paper>
  </Main>
))
.add('Basket screen', () => (
  <Main>
    <Sell />
  </Main>
))
