import React from 'react'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog/Dialog'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import TextField from 'material-ui/TextField/TextField'
import {getFieldValues} from '../../Helpers.js'
import {Translate} from '../../Translation'

const ShopAdd = React.createClass({
  propTypes: {
    add: React.PropTypes.func,
    cantAdd: React.PropTypes.func,
    cancelToggle: React.PropTypes.func,
    fetch: React.PropTypes.func,
    shopAdd: React.PropTypes.object
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
      <Dialog ref='dialog' actions={actions} title={<Translate id='Product category add' />} modal open={this.props.shopAdd.open}>
        <TextField
          ref='name'
          hintText={<Translate id='Category name' />}
          floatingLabelText={<Translate id='Category name' />}
          errorText={this.props.shopAdd.fieldError.name}
        />
      </Dialog>
    )
  }
})

export default connect(
  (state) => ({shopAdd: state.shopAdd}),
  {
    add(body) {
      return {type: 'SHOP_ADD', httpRequest: {
        method: 'POST',
        url: '/api/Shop',
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
        type: 'FETCH_SHOPS', httpRequest: {
          method: 'GET',
          url: '/api/Shop',
          json: true
        }
      }
    }
  }
)(ShopAdd)
