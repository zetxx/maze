import React from 'react'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog/Dialog'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import TextField from 'material-ui/TextField/TextField'

const ProductCatAdd = React.createClass({
  propTypes: {
    add: React.PropTypes.func,
    cancelToggle: React.PropTypes.func,
    fetch: React.PropTypes.func,
    productCatAdd: React.PropTypes.object
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
    if (this.props.productCatAdd.open && !next.productCatAdd.open && !next.productCatAdd.canceled) {
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
    if (this.refs.dialog && this.props.productCatAdd.open && !this.refs.dialog.props.open) {
    } else {
      errorText = this.state && this.state.errorText
    }
    return (
      <Dialog ref='dialog' actions={actions} title='Product add!' modal open={this.props.productCatAdd.open}>
        <TextField
          ref='name'
          hintText='Product name'
          floatingLabelText='Product name'
          errorText={errorText}
        />
      </Dialog>
    )
  }
})

export default connect(
  (state) => ({productCatAdd: state.productCatAdd}),
  {
    add(body) {
      return {type: 'PRODUCT_CAT_ADD', httpRequest: {
        method: 'POST',
        url: '/api/productCategory',
        json: true,
        body: body
      }}
    },
    cancelToggle() {
      return {type: 'TOGGLE_PRODUCT_CAT_ADD', canceled: true}
    },
    fetch(httpRequest) {
      return {
        type: 'FETCH_PRODUCT_CATEGORIES', httpRequest: {
          method: 'GET',
          url: '/api/productCategory',
          json: true
        }
      }
    }
  }
)(ProductCatAdd)
