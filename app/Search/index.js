import React from 'react'
import TextField from 'material-ui/TextField'
import SearchResults from './SearchResults.js'
import {connect} from 'react-redux'

var a = []
var data = [
  {title: 'morkvi', quantity: 0.450, price: 3.50},
  {title: 'karofi', quantity: 1, price: 3.10},
  {title: 'hlqb', quantity: 2, price: 1.05},
  {title: 'marulqk', quantity: 0.300, price: 1.10}
]

const Search = React.createClass({
  handleChange(e, value) {
    a.push(value)
    setTimeout(() => {
      a.shift()
      if (!a.length) {
        console.log('trigggerrrrrrrrrr!!!')
      } else {
        console.log('!!!!waitinggg')
      }
    }, 1000)
  },
  render() {
    return (
      <div style={{padding: '0 10px', position: 'relative'}}>
        <TextField
          floatingLabelText='Product Search'
          onChange={this.handleChange}
        />
        <SearchResults />
      </div>
    )
  }
})

export default connect(
  null,
  {
    search(body) {
      return {type: 'SEARCH', httpRequest: {
        method: 'POST',
        url: '/api/product/search',
        json: true,
        body: body
      }}
    }
  }
)(Search)
