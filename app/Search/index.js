import React from 'react'
import {connect} from 'react-redux'
import TextField from 'material-ui/TextField'
import SearchResults from './SearchResults'
import QuantitySelection from './quantitySelection'

var a = []

const Search = React.createClass({
  propTypes: {
    search: React.PropTypes.func
  },
  handleChange(e, value) {
    a.push(value)
    setTimeout(() => {
      a.shift()
      if (!a.length) {
        var val = this.refs.search.getValue()
        if (val) {
          this.props.search({product: val})
        }
      }
    }, 1000)
  },
  focus() {
    this.refs.search.input.focus()
  },
  componentDidMount() {
    this.focus()
  },
  render() {
    return (
      <div style={{padding: '0 10px', position: 'relative'}}>
        <TextField
          style={{width: '600px'}}
          ref='search'
          floatingLabelText='Product Search'
          onChange={this.handleChange}
        />

        <SearchResults />
        <QuantitySelection focus={this.focus} />
      </div>
    )
  }
})

export default connect(
  null,
  {
    search(body) {
      return {type: 'SEARCH', preloader: false, httpRequest: {
        method: 'POST',
        url: '/api/sellSearch',
        json: true,
        body: body
      }}
    }
  }
)(Search)
