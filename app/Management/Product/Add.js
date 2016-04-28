import React from 'react'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog/Dialog'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import TextField from 'material-ui/TextField/TextField'
import ProductCat from './ProductCat'

const ProductAdd = React.createClass({
  propTypes: {
    add: React.PropTypes.func,
    cancelToggle: React.PropTypes.func,
    fetch: React.PropTypes.func,
    productAdd: React.PropTypes.object
  },
  add() {
    var val = this.refs.name.getValue()
    if (val) {
      this.setState({errorText: false})
      this.props.add({
        name: val
      })
    } else {
      this.setState({errorText: 'Required field'})
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
    var errorText = ''
    if (this.refs.dialog && this.props.productAdd.open && !this.refs.dialog.props.open) {
    } else {
      errorText = this.state && this.state.errorText
    }
    return (
      <Dialog ref='dialog' actions={actions} title='Product add!' modal open={this.props.productAdd.open}>
        <TextField
          ref='name'
          hintText='Product name'
          floatingLabelText='Product name'
          errorText={errorText}
        />
        <ProductCat ref='category' />
        <TextField
          ref='description'
          hintText='Product description'
          floatingLabelText='Product description'
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
