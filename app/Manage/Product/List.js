import React from 'react'
import {connect} from 'react-redux'
import Card from 'material-ui/Card/Card'
import Add from './Add'
import Repository from '../Repository'
import {Translate} from '../../Translation'
import AppBar from 'material-ui/AppBar/AppBar'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import {Table, TableHeaderColumn, TableRow, TableHeader, TableBody, TableRowColumn} from 'material-ui/Table'
import IconButton from 'material-ui/IconButton/IconButton'
import EjectIcon from 'material-ui/svg-icons/action/eject'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import CachedIcon from 'material-ui/svg-icons/action/cached'
import Edit from './Edit'
import {actionList} from './reducers'

class Product extends React.Component {
  componentDidMount() {
    this.props.fetch()
  }
  load(productId) {
    return this.props.load.bind(null, productId)
  }
  edit(productId) {
    return () => {
      this.props.edit(productId)
    }
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
            title={<Translate id='Product' />}
            iconElementRight={<FlatButton label={<Translate id='Add' />} onTouchTap={this.props.add} />}
          />

          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn><Translate id='Name' /></TableHeaderColumn>
                <TableHeaderColumn><Translate id='Category' /></TableHeaderColumn>
                <TableHeaderColumn style={{width: '150px'}}><Translate id='Quantity' /></TableHeaderColumn>
                <TableHeaderColumn style={{width: '150px'}}><Translate id='Price' /></TableHeaderColumn>
                <TableHeaderColumn style={{width: '150px'}}><Translate id='Operations' /></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.products.data && this.props.products.data.map((el) => (
                <TableRow key={el.id}>
                  <TableRowColumn>{el.name}</TableRowColumn>
                  <TableRowColumn>{productsCat[el.productCategory.id] || ''}</TableRowColumn>
                  <TableHeaderColumn style={{width: '150px'}}>{el.repository && el.repository.quantity}</TableHeaderColumn>
                  <TableHeaderColumn style={{width: '150px'}}>{el.price}</TableHeaderColumn>
                  <TableRowColumn style={{width: '150px'}}>
                    <IconButton title={<Translate id='Load' />} onTouchTap={this.load(el.id)}><CachedIcon /></IconButton>
                    <IconButton><EditIcon title={<Translate id='Edit' />} onTouchTap={this.edit(el.id)} /></IconButton>
                    <IconButton><EjectIcon title={<Translate id='Disable' />} /></IconButton>
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <Add />
        <Repository />
        <Edit />
      </div>
    )
  }
}

Product.propTypes = {
  fetch: React.PropTypes.func,
  add: React.PropTypes.func,
  edit: React.PropTypes.func,
  load: React.PropTypes.func,
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
        type: actionList.FETCH, httpRequest: {
          method: 'GET',
          url: '/api/config/products',
          json: true
        }
      }
    },
    add() {
      return {type: actionList.TOGGLE_ADD}
    },
    edit(productId) {
      return {
        type: actionList.FETCH_PRODUCT, httpRequest: {
          method: 'GET',
          url: `/api/config/products/${productId}`,
          json: true
        }
      }
    },
    load(productId) {
      return {type: 'TOGGLE_REPOSITORY_ADD', productId: productId}
    }
  }
)(Product)
