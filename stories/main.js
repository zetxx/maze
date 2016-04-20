import React from 'react'
import { storiesOf } from '@kadira/storybook'
import List from 'material-ui/lib/lists/list'
import Paper from 'material-ui/lib/paper'
import Search from '../app/Search/component'
import AppBar from 'material-ui/lib/app-bar'
import FlatButton from 'material-ui/lib/flat-button'
import Basket from '../app/Basket'
import BasketGroup from '../app/BasketGroup'

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
.add('Baskets group list', () => (
  <Paper zDepth={3}>
    <AppBar
      title={<span>Groups</span>}
      iconElementRight={<FlatButton label='Add new' />}
    />
    <div>
      {baskeGrouptList.map((el, idx) => (idx % 2 ? <BasketGroup key={idx} data={el}/> : <BasketGroup key={idx} selectState data={el}/>))}
    </div>
  </Paper>
))
.add('Basket + product search', () => (
  <Paper zDepth={3}>
    <Search />
    <List>
      <Basket data={basketList}/>
    </List>
  </Paper>
))
