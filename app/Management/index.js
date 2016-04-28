import React from 'react'
import Product from './Product'
import ProductCat from './ProductCat'

export default class Management extends React.Component {
  render() {
    return (
      <div>
        <Product />
        <ProductCat />
      </div>
    )
  }
}
