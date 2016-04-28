import React from 'react'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog/Dialog'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import TextField from 'material-ui/TextField/TextField'

const Maze = React.createClass({
  propTypes: {
    add: React.PropTypes.func,
    cancelToggle: React.PropTypes.func,
    fetch: React.PropTypes.func,
    mazeAdd: React.PropTypes.object
  },
  add() {
    var val = this.refs.name.getValue()
    if (val) {
      this.setState({errorText: false})
      this.props.add({
        name: val,
        category: this.productCat
      })
    } else {
      this.setState({errorText: 'Required field'})
    }
  },
  componentWillReceiveProps(next) {
    if (this.props.mazeAdd.open && !next.mazeAdd.open && !next.mazeAdd.canceled) {
      next.fetch()
    }
  },
  productCat: 1,
  handleProductCatChange(val) {
    this.productCat = val
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
    if (this.refs.dialog && this.props.mazeAdd.open && !this.refs.dialog.props.open) {
    } else {
      errorText = this.state && this.state.errorText
    }
    return (
      <Dialog ref='dialog' actions={actions} title='Product add!' modal open={this.props.mazeAdd.open}>
        <TextField
          ref='quantity'
          hintText='Quantity'
          floatingLabelText='Quantity'
          errorText={errorText}
        />
        <TextField
          ref='price'
          hintText='Price'
          floatingLabelText='Price'
        />
      </Dialog>
    )
  }
})

export default connect(
  (state) => ({mazeAdd: state.mazeAdd}),
  {
    add(body) {
      return {type: 'MAZE_ADD', httpRequest: {
        method: 'POST',
        url: '/api/product',
        json: true,
        body: body
      }}
    },
    cancelToggle() {
      return {type: 'TOGGLE_MAZE_ADD', canceled: true}
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
)(Maze)
