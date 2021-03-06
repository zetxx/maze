import React from 'react'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog/Dialog'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import TextField from 'material-ui/TextField/TextField'
import {getFieldValues} from '../../Helpers.js'
import {Translate} from '../../Translation'
import {actionList} from './reducers.js'
import PropTypes from 'prop-types'
import createClass from 'create-react-class'

const ProductCatAdd = createClass({
  propTypes: {
    add: PropTypes.func,
    cantAdd: PropTypes.func,
    cancelToggle: PropTypes.func,
    fetch: PropTypes.func,
    productCatAdd: PropTypes.object
  },
  add() {
    var vals = getFieldValues(this.refs, ['name'])
    if (Object.keys(vals.incorrect).length === 0) {
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
      <Dialog ref='dialog' actions={actions} title={<h3 style={{padding: '24px'}}><Translate id='Product category add' /></h3>} modal open={this.props.productCatAdd.open}>
        <TextField
          ref='name'
          hintText={<Translate id='Category name' />}
          floatingLabelText={<Translate id='Category name' />}
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
      return {type: actionList.ADD,
        httpRequest: {
          method: 'POST',
          url: '/api/productCategories',
          json: true,
          body: body
        }}
    },
    cantAdd(problems) {
      return {type: actionList.ADD_VALIDATION_PROBLEM, problems}
    },
    cancelToggle() {
      return {type: actionList.TOGGLE_ADD, canceled: true}
    },
    fetch(httpRequest) {
      return {
        type: actionList.FETCH,
        httpRequest: {
          method: 'GET',
          url: '/api/productCategories',
          json: true
        }
      }
    }
  }
)(ProductCatAdd)
