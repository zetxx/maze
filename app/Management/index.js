import React from 'react'
import Product from './Product'
import ProductCat from './ProductCat'

export default class Management extends React.Component {
  render() {
    return (
      <div>
        <br />
        <Product />
        <br />
        <ProductCat />
      </div>
    )
  }
}
