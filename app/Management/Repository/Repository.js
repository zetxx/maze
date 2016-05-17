import React from 'react'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog/Dialog'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import TextField from 'material-ui/TextField/TextField'
import {getFieldValues} from '../../Helpers.js'
import QuantityType from './QuantityType.js'

const Repository = React.createClass({
  propTypes: {
    add: React.PropTypes.func,
    cantAdd: React.PropTypes.func,
    cancelToggle: React.PropTypes.func,
    repository: React.PropTypes.object
  },
  getInitialState() {
    return {value: 'piece'}
  },
  add() {
    var vals = getFieldValues(this.refs, ['quantity', 'quantityType', 'price'])
    if (Object.keys(vals.incorrect).length === 0) {
      vals.correct.productId = this.props.repository.productId
      this.props.add(vals.correct)
    } else {
      return this.props.cantAdd(vals.incorrect)
    }
  },
  componentWillReceiveProps(next) {
    if (this.props.repository.open && !next.repository.open && !next.repository.canceled) {
      next.fetch()
    }
  },
  handleChange (event, index, value) {
    this.setState({value})
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
      <Dialog actions={actions} title='Load' modal open={this.props.repository.open}>
        <TextField
          ref='quantity'
          hintText='Quantity'
          floatingLabelText='Quantity'
          errorText={this.props.repository.fieldError.quantity}
        />
        <QuantityType ref='quantityType' />
        <TextField
          ref='price'
          hintText='Price'
          floatingLabelText='Price'
          errorText={this.props.repository.fieldError.price}
        />
      </Dialog>
    )
  }
})

export default connect(
  (state) => ({repository: state.repository}),
  {
    add(body) {
      return {type: 'REPOSITORY_ADD', httpRequest: {
        method: 'POST',
        url: '/api/repository',
        json: true,
        body: body
      }}
    },
    cantAdd(problems) {
      return {type: 'REPOSITORY_ADD_VALIDATION_PROBLEM', problems}
    },
    cancelToggle() {
      return {type: 'TOGGLE_REPOSITORY_ADD', canceled: true}
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
)(Repository)
