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

class Product extends React.Component {
  componentDidMount() {
    this.props.fetch()
  }
  render() {
    return (
      <div>
        <Card>
          <AppBar
            title={<span>ProductCat</span>}
            iconElementRight={<FlatButton label='Add' onTouchTap={this.props.add} />}
          />

          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Quantity</TableHeaderColumn>
                <TableHeaderColumn>Price</TableHeaderColumn>
                <TableHeaderColumn style={{width: '100px'}}>Operations</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.products.data && this.props.products.data.map((el) => (
                <TableRow key={el.id}>
                  <TableRowColumn>1</TableRowColumn>
                  <TableRowColumn>this.props.value.quanti</TableRowColumn>
                  <TableRowColumn>{el.name}</TableRowColumn>
                  <TableRowColumn style={{width: '100px'}}>
                    <IconButton><EjectIcon /></IconButton>
                    <IconButton><EditIcon /></IconButton>
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
  products: React.PropTypes.object
}

export default connect(
  (state) => ({products: state.products}),
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
