import React from 'react'
import { storiesOf } from '@kadira/storybook'
import List from 'material-ui/lib/lists/list'
import Paper from 'material-ui/lib/paper'
import Search from '../app/Search/component'
import Basket from '../app/Basket'

storiesOf('Button', module)
.add('Search in bar', () => (
  <Paper zDepth={3}>
    <Search />
    <List>
      <Basket data={[
        {id: 1, title: 'krastavici', quantity: '0.500', price: 10.55},
        {id: 2, title: 'hlqb', quantity: '1', price: 1.05}
      ]}/>
    </List>
  </Paper>
))
.add('Search bar', () => (
  <Search />
))
