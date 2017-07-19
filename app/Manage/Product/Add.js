import React from 'react'
import {connect} from 'react-redux'
import {Translate} from '../../Translation'
import Dialog from 'material-ui/Dialog/Dialog'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import TextField from 'material-ui/TextField/TextField'
import ProductCatDropDown from './dropDown'
import SupplierDropDown from '../Supplier/dropDown'
import {getFieldValues} from '../../Helpers.js'

const ProductAdd = React.createClass({
  propTypes: {
    add: React.PropTypes.func,
    cantAdd: React.PropTypes.func,
    cancelToggle: React.PropTypes.func,
    fetchProducts: React.PropTypes.func,
    productAdd: React.PropTypes.object
  },
  add() {
    var vals = getFieldValues(this.refs, ['name', 'category', 'supplier', 'description', 'barcode'])
    if (Object.keys(vals.incorrect).length === 0) {
      this.props.add(vals.correct)
    } else {
      return this.props.cantAdd(vals.incorrect)
    }
  },
  componentWillReceiveProps(next) {
    if (this.props.productAdd.open && !next.productAdd.open && !next.productAdd.canceled) {
      next.fetchProducts()
    }
  },
  render() {
    const actions = [
      <FlatButton
        label={<Translate id='Cancel' />}
        secondary
        onTouchTap={this.props.cancelToggle}
      />,
      <FlatButton
        label={<Translate id='Submit' />}
        primary
        onTouchTap={this.add}
      />
    ]

    return (
      <Dialog actions={actions} title={<h3 style={{padding: '24px'}}><Translate id='Product add' /></h3>} modal open={this.props.productAdd.open}>
        <TextField
          ref='name'
          hintText={<Translate id='Product name' />}
          floatingLabelText={<Translate id='Product name' />}
          errorText={this.props.productAdd.fieldError.name}
        />
        <ProductCatDropDown ref='category' value={1} />
        <SupplierDropDown ref='supplier' value={1} />
        <TextField
          ref='description'
          hintText={<Translate id='Product description' />}
          floatingLabelText={<Translate id='Product description' />}
          errorText={this.props.productAdd.fieldError.description}
        />
        <TextField
          ref='barcode'
          hintText={<Translate id='Product Bar code' />}
          floatingLabelText={<Translate id='Product Bar code' />}
          errorText={this.props.productAdd.fieldError.barcode}
        />
      </Dialog>
    )
  }
})

export default connect(
  (state) => ({productAdd: state.productAdd}),
  {
    add(body) {
      return {type: 'PRODUCT_ADD', httpRequest: {
        method: 'POST',
        url: '/api/product',
        json: true,
        body: body
      }}
    },
    cantAdd(problems) {
      return {type: 'PRODUCT_ADD_VALIDATION_PROBLEM', problems}
    },
    cancelToggle() {
      return {type: 'TOGGLE_PRODUCT_ADD', canceled: true}
    },
    fetchProducts() {
      return {
        type: 'FETCH_PRODUCTS', httpRequest: {
          method: 'GET',
          url: '/api/product',
          json: true
        }
      }
    }
  }
)(ProductAdd)
