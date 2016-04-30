import React from 'react'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog/Dialog'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import TextField from 'material-ui/TextField/TextField'
import ProductCat from './ProductCat'
import {getFieldValues} from '../../Helpers.js'

const ProductAdd = React.createClass({
  propTypes: {
    add: React.PropTypes.func,
    cantAdd: React.PropTypes.func,
    cancelToggle: React.PropTypes.func,
    fetch: React.PropTypes.func,
    productAdd: React.PropTypes.object
  },
  add() {
    var vals = getFieldValues(this.refs, ['name', 'category', 'description'])
    if (Object.keys(vals.incorrect).length === 0) {
      this.props.add(vals.correct)
    } else {
      return this.props.cantAdd(vals.incorrect)
    }
  },
  componentWillReceiveProps(next) {
    if (this.props.productAdd.open && !next.productAdd.open && !next.productAdd.canceled) {
      next.fetch()
    }
  },
  render() {
    const actions = [
      <FlatButton
        label='Cancel'
        secondary
        onTouchTap={this.props.cancelToggle}
      />,
      <FlatButton
        label='Submit'
        primary
        onTouchTap={this.add}
      />
    ]

    return (
      <Dialog actions={actions} title='Product add' modal open={this.props.productAdd.open}>
        <TextField
          ref='name'
          hintText='Product name'
          floatingLabelText='Product name'
          errorText={this.props.productAdd.fieldError.name}
        />
        <ProductCat ref='category' value={1} />
        <TextField
          ref='description'
          hintText='Product description'
          floatingLabelText='Product description'
          errorText={this.props.productAdd.fieldError.description}
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
    fetch() {
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
