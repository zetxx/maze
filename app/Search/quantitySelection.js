import React from 'react'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog/Dialog'
import TextField from 'material-ui/TextField'

const QuantitySelection = React.createClass({
  propTypes: {
    quantitySelectToggle: React.PropTypes.func,
    focusSearch: React.PropTypes.func,
    quantitySelection: React.PropTypes.object
  },
  componentWillReceiveProps() {
    setTimeout(() => {
      if (this.refs.q) {
        this.refs.q.input.focus()
      }
    }, 0)
  },
  handleOnKeyDown(a) {
    console.log(a.keyCode)
    if (a.keyCode === 13) {
      var val = this.refs.q.getValue()
      if (val) {
        this.props.quantitySelectToggle()
      }
    } else if (a.keyCode === 27) {
      this.props.quantitySelectToggle()
      setTimeout(this.props.focusSearch, 100)
    }
  },
  render() {
    return (
      <Dialog ref='dialog' title='How much?' modal open={this.props.quantitySelection.open}>
        <TextField ref='q' floatingLabelText='Enter quantity' onKeyDown={this.handleOnKeyDown} />
      </Dialog>
    )
  }
})

export default connect(
  (state) => ({quantitySelection: state.quantitySelection}),
  {
    quantitySelectToggle() {
      return {type: 'QUANTITY_SELECT_TOGGLE'}
    }
  }
)(QuantitySelection)
