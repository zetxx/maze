import React from 'react'
import TextField from 'material-ui/TextField'
var a = []
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
      <div style={{padding: '0 10px'}}>
        <TextField
          floatingLabelText='Product Search'
          onChange={this.handleChange}
        />
      </div>
    )
  }
})

export default Search
