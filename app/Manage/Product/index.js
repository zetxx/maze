import React from 'react'
import Products from './List'
import {connect} from 'react-redux'
import {setTitle} from '../../Heading/actions'
import ProductCat from '../ProductCat'
import Suppliers from '../Supplier'
import PropTypes from 'prop-types'
import createClass from 'create-react-class'

const Management = createClass({
  propTypes: {
    setTitle: PropTypes.func
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
        <br />
        <Suppliers />
      </div>
    )
  }
})

export default connect(
  null,
  {setTitle}
)(Management)
