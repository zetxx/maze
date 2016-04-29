import React from 'react'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog/Dialog'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import TextField from 'material-ui/TextField/TextField'
import {getFieldValues} from '../../Helpers.js'

const ProductCatAdd = React.createClass({
  propTypes: {
    add: React.PropTypes.func,
    cantAdd: React.PropTypes.func,
    cancelToggle: React.PropTypes.func,
    fetch: React.PropTypes.func,
    productCatAdd: React.PropTypes.object
  },
  add() {
    var vals = getFieldValues(this.refs, ['name'])
    if (!vals.incorrect) {
      this.props.add(vals.correct)
    } else {
      return this.props.cantAdd(vals.incorrect)
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

    return (
      <Dialog ref='dialog' actions={actions} title='Product add!' modal open={this.props.productCatAdd.open}>
        <TextField
          ref='name'
          hintText='Product name'
          floatingLabelText='Product name'
          errorText={this.props.productCatAdd.fieldError.name}
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
    cantAdd(problems) {
      return {type: 'PRODUCT_CAT_ADD_VALIDATION_PROBLEM', problems}
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
