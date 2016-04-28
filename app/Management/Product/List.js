import React from 'react'
import {connect} from 'react-redux'
import Card from 'material-ui/Card/Card'
import Add from './Add'
import AppBar from 'material-ui/AppBar/AppBar'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import {Table, TableHeaderColumn, TableRow, TableHeader, TableBody, TableRowColumn} from 'material-ui/Table'
import IconButton from 'material-ui/IconButton/IconButton'
import EjectIcon from 'material-ui/svg-icons/action/eject'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import CachedIcon from 'material-ui/svg-icons/action/cached'

class Product extends React.Component {
  componentDidMount() {
    this.props.fetch()
  }
  render() {
    var productsCat = (this.props.productCategories && this.props.productCategories.data || []).reduce((prev, cur) => {
      prev[cur.id] = cur.name
      return prev
    }, {})

    return (
      <div>
        <Card>
          <AppBar
            title={<span>Product</span>}
            iconElementRight={<FlatButton label='Add' onTouchTap={this.props.add} />}
          />

          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Category</TableHeaderColumn>
                <TableHeaderColumn style={{width: '150px'}}>Quantity</TableHeaderColumn>
                <TableHeaderColumn style={{width: '150px'}}>Price</TableHeaderColumn>
                <TableHeaderColumn style={{width: '150px'}}>Operations</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.products.data && this.props.products.data.map((el) => (
                <TableRow key={el.id}>
                  <TableRowColumn>{el.name}</TableRowColumn>
                  <TableRowColumn>{productsCat[el.category] || ''}</TableRowColumn>
                  <TableHeaderColumn style={{width: '150px'}}>100</TableHeaderColumn>
                  <TableHeaderColumn style={{width: '150px'}}>12.10</TableHeaderColumn>
                  <TableRowColumn style={{width: '150px'}}>
                    <IconButton><CachedIcon title='Load' /></IconButton>
                    <IconButton><EditIcon /></IconButton>
                    <IconButton><EjectIcon /></IconButton>
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <Add />
      </div>
    )
  }
}

Product.propTypes = {
  fetch: React.PropTypes.func,
  add: React.PropTypes.func,
  products: React.PropTypes.object,
  productCategories: React.PropTypes.object
}

export default connect(
  (state) => ({
    products: state.products,
    productCategories: state.productCategories
  }),
  {
    fetch() {
      return {
        type: 'FETCH_PRODUCTS', httpRequest: {
          method: 'GET',
          url: '/api/product',
          json: true
        }
      }
    },
    add() {
      return {type: 'TOGGLE_PRODUCT_ADD'}
    }
  }
)(Product)
