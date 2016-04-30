import React from 'react'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog/Dialog'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import TextField from 'material-ui/TextField/TextField'
import {getFieldValues} from '../../Helpers.js'

const Maze = React.createClass({
  propTypes: {
    add: React.PropTypes.func,
    cantAdd: React.PropTypes.func,
    cancelToggle: React.PropTypes.func,
    maze: React.PropTypes.object
  },
  add() {
    var vals = getFieldValues(this.refs, ['quantity'])
    if (Object.keys(vals.incorrect).length === 0) {
      this.props.add(vals.correct)
    } else {
      return this.props.cantAdd(vals.incorrect)
    }
  },
  componentWillReceiveProps(next) {
    if (this.props.maze.open && !next.maze.open && !next.maze.canceled) {
      next.fetch()
    }
  },
  render() {
    console.log(this.props.maze.productId)
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
      <Dialog ref='dialog' actions={actions} title='Load' modal open={this.props.maze.open}>
        <TextField
          ref='quantity'
          hintText='Quantity'
          floatingLabelText='Quantity'
          errorText={this.props.maze.fieldError.name}
        />
      </Dialog>
    )
  }
})

export default connect(
  (state) => ({maze: state.maze}),
  {
    add(body) {
      return {type: 'MAZE_ADD', httpRequest: {
        method: 'POST',
        url: '/api/maze',
        json: true,
        body: body
      }}
    },
    cantAdd(problems) {
      return {type: 'MAZE_ADD_VALIDATION_PROBLEM', problems}
    },
    cancelToggle() {
      return {type: 'TOGGLE_MAZE_ADD', canceled: true}
    }
  }
)(Maze)
