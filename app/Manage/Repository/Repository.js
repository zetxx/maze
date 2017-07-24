import React from 'react'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog/Dialog'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import TextField from 'material-ui/TextField/TextField'
import {getFieldValues} from '../../Helpers.js'
import {Translate} from '../../Translation'
import ShopsDropdown from '../../Manage/Config/Shop/Dropdown'
import {actionList as productActionList} from '../Product/reducers'

const Repository = React.createClass({
  propTypes: {
    add: React.PropTypes.func,
    cantAdd: React.PropTypes.func,
    cancelToggle: React.PropTypes.func,
    fetch: React.PropTypes.func,
    fetchShops: React.PropTypes.func,
    repository: React.PropTypes.object
  },
  getInitialState() {
    return {value: 'piece'}
  },
  add() {
    var vals = getFieldValues(this.refs, ['quantity', 'shopId'])
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
      <Dialog actions={actions} title={<h3 style={{padding: '24px'}}><Translate id='Load' /></h3>} modal open={this.props.repository.open}>
        <ShopsDropdown ref='shopId' value={1} />
        <TextField
          ref='quantity'
          hintText={<Translate id='Quantity' />}
          floatingLabelText={<Translate id='Quantity' />}
          errorText={this.props.repository.fieldError.quantity}
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
        url: '/api/repositories',
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
        type: productActionList.FETCH, httpRequest: {
          method: 'GET',
          url: '/api/products',
          json: true
        }
      }
    }
  }
)(Repository)
