import React from 'react'
import Product from './Product'
import ProductCat from './ProductCat'
import Maze from './Maze'

export default class Management extends React.Component {
  render() {
    return (
      <div>
        <Maze />
        <Product />
        <ProductCat />
      </div>
    )
  }
}
