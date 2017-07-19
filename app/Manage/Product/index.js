import React from 'react'
import Products from './List'

import {connect} from 'react-redux'
import {setTitle} from '../../Heading/actions'
import ProductCat from '../ProductCat'

const Management = React.createClass({
  propTypes: {
    setTitle: React.PropTypes.func
  },
  componentDidMount() {
    this.props.setTitle('Product Management')
  },
  render() {
    return (
      <div>
        <Products />
        <br />
        <ProductCat />
      </div>
    )
  }
})

export default connect(
  null,
  {setTitle}
)(Management)
