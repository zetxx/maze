import React from 'react'
import {connect} from 'react-redux'
import TextField from 'material-ui/TextField'
import SearchResults from './SearchResults'
import QuantitySelection from './quantitySelection'
import {Translate} from '../Translation'
import {actionList} from './reducers.js'
import PropTypes from 'prop-types'
import createClass from 'create-react-class'

var a = []

const StoreProductSearch = createClass({
  propTypes: {
    search: PropTypes.func
  },
  handleChange(e, value) {
    this.targetElement = e.currentTarget;
    a.push(value)
    setTimeout(() => {
      a.shift()
      if (!a.length) {
        var val = this.refs.search.getValue()
        if (val) {
          this.props.search({product: val})
        }
      }
    }, 300)
  },
  focus() {
    this.refs.search.input.focus()
  },
  componentDidMount() {
    this.focus()
  },
  componentWillReceiveProps(newProps) {
    this.focus()
  },
  getPosition() {
    var pos = this.refs.searchHolder.getBoundingClientRect()
    return {top: pos.bottom, left: pos.left}
  },
  getTargetElement() {
    return this.targetElement;
  },
  shouldComponentUpdate(nextProps) {
    setTimeout(this.focus, 1000)
    return false
  },
  render() {
    return (
      <div style={{padding: '0 10px', position: 'relative'}}>
        <div ref='searchHolder'>
          <TextField
            style={{width: '600px'}}
            ref='search'
            floatingLabelText={<Translate id='Product Search' />}
            onFocus={this.handleFocus}
            onChange={this.handleChange}
          />
        </div>

        <SearchResults getPosition={this.getPosition} getTargetElement={this.getTargetElement} focusSearch={this.focus} />
        <QuantitySelection focusSearch={this.focus} />
      </div>
    )
  }
})

export default connect(
  (state) => (state.basket),
  {
    search(body) {
      return {type: actionList.FETCH, preloader: false, httpRequest: {
        method: 'POST',
        url: '/api/storeProductSearch',
        json: true,
        body: body
      }}
    }
  }
)(StoreProductSearch)
