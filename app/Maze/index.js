import React from 'react'
import Product from './Product'
import Maza from './Maza'

export default class Maze extends React.Component {
  render() {
    return (
      <div>
        <Maza />
        <Product />
      </div>
    )
  }
}
