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

const SupplierAdd = createClass({
  propTypes: {
    add: PropTypes.func,
    cantAdd: PropTypes.func,
    cancelToggle: PropTypes.func,
    fetch: PropTypes.func,
    SupplierAdd: PropTypes.object
  },
  add() {
    var vals = getFieldValues(this.refs, ['name', 'lon', 'lat', 'description'])
    if (Object.keys(vals.incorrect).length === 0) {
      this.props.add(vals.correct)
    } else {
      return this.props.cantAdd(vals.incorrect)
    }
  },
  componentWillReceiveProps(next) {
    if (this.props.supplierAdd.open && !next.supplierAdd.open && !next.supplierAdd.canceled) {
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
      <Dialog ref='dialog' actions={actions} title={<h3 style={{padding: '24px'}}><Translate id='Supplier add' /></h3>} modal open={this.props.supplierAdd.open}>
        <TextField
          ref='name'
          hintText={<Translate id='Name' />}
          floatingLabelText={<Translate id='Name' />}
          errorText={this.props.supplierAdd.fieldError.name}
        />
        <br />
        <TextField
          ref='lon'
          hintText={<Translate id='Longitude' />}
          floatingLabelText={<Translate id='Longitude' />}
          errorText={this.props.supplierAdd.fieldError.lon}
        />
        <TextField
          ref='lat'
          hintText={<Translate id='Latitude' />}
          floatingLabelText={<Translate id='Latitude' />}
          errorText={this.props.supplierAdd.fieldError.lat}
        />
        <br />
        <TextField
          ref='description'
          hintText={<Translate id='Description' />}
          floatingLabelText={<Translate id='Description' />}
          errorText={this.props.supplierAdd.fieldError.description}
        />
      </Dialog>
    )
  }
})

export default connect(
  (state) => ({supplierAdd: state.supplierAdd}),
  {
    add(body) {
      return {type: actionList.ADD,
        httpRequest: {
          method: 'POST',
          url: '/api/suppliers',
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
          url: '/api/suppliers',
          json: true
        }
      }
    }
  }
)(SupplierAdd)
