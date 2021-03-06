import React from 'react'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog/Dialog'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import TextField from 'material-ui/TextField/TextField'
import {getFieldValues} from '../../../Helpers.js'
import {Translate} from '../../../Translation'
import PropTypes from 'prop-types'
import createClass from 'create-react-class'

const ShopAdd = createClass({
  propTypes: {
    add: PropTypes.func,
    cantAdd: PropTypes.func,
    cancelToggle: PropTypes.func,
    fetch: PropTypes.func,
    shopAdd: PropTypes.object
  },
  add() {
    var vals = getFieldValues(this.refs, ['name', 'lon', 'lat'])
    if (Object.keys(vals.incorrect).length === 0) {
      this.props.add(vals.correct)
    } else {
      return this.props.cantAdd(vals.incorrect)
    }
  },
  componentWillReceiveProps(next) {
    if (this.props.shopAdd.open && !next.shopAdd.open && !next.shopAdd.canceled) {
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
      <Dialog ref='dialog' actions={actions} title={<h3 style={{padding: '24px'}}><Translate id='Shop add' /></h3>} modal open={this.props.shopAdd.open}>
        <TextField
          ref='name'
          hintText={<Translate id='Name' />}
          floatingLabelText={<Translate id='Name' />}
          errorText={this.props.shopAdd.fieldError.name}
        />
        <br />
        <TextField
          ref='lon'
          hintText={<Translate id='Longitude' />}
          floatingLabelText={<Translate id='Longitude' />}
          errorText={this.props.shopAdd.fieldError.lon}
        />
        <TextField
          ref='lat'
          hintText={<Translate id='Latitude' />}
          floatingLabelText={<Translate id='Latitude' />}
          errorText={this.props.shopAdd.fieldError.lat}
        />
      </Dialog>
    )
  }
})

export default connect(
  (state) => ({shopAdd: state.shopAdd}),
  {
    add(body) {
      return {type: 'SHOP_ADD',
        httpRequest: {
          method: 'POST',
          url: '/api/shops',
          json: true,
          body: body
        }}
    },
    cantAdd(problems) {
      return {type: 'SHOP_ADD_VALIDATION_PROBLEM', problems}
    },
    cancelToggle() {
      return {type: 'TOGGLE_SHOP_ADD', canceled: true}
    },
    fetch(httpRequest) {
      return {
        type: 'FETCH_SHOPS',
        httpRequest: {
          method: 'GET',
          url: '/api/shops',
          json: true
        }
      }
    }
  }
)(ShopAdd)
