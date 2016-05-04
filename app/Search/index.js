import React from 'react'
import TextField from 'material-ui/TextField'

const Search = React.createClass({
  render() {
    return (
      <div style={{padding: '0 10px'}}>
        <TextField
          floatingLabelText='Product Search'
        />
      </div>
    )
  }
})

export default Search
