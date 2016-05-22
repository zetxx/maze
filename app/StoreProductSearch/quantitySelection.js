import React from 'react'
import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
import Dialog from 'material-ui/Dialog/Dialog'
import TextField from 'material-ui/TextField'

const QuantitySelection = React.createClass({
  propTypes: {
    quantitySelectToggle: React.PropTypes.func,
    basketCreateAndFill: React.PropTypes.func,
    focusSearch: React.PropTypes.func,
    quantitySelection: React.PropTypes.object,
    activeBasket: React.PropTypes.object
  },
  componentWillReceiveProps() {
    setTimeout(() => {
      if (this.refs.q) {
        this.refs.q.input.focus()
      }
    }, 0)
  },
  handleOnKeyDown(a) {
    if (a.keyCode === 13) {
      var val = this.refs.q.getValue()
      if (val) {
        var product = Object.assign({}, this.props.quantitySelection.product, {quantity: val, basketId: this.props.activeBasket.id})
        this.props.quantitySelectToggle()
        this.props.basketCreateAndFill(product)
      }
    } else if (a.keyCode === 27) {
      this.props.quantitySelectToggle()
      setTimeout(this.props.focusSearch, 100)
    }
  },
  render() {
    return (
      <Dialog ref='dialog' title={<h3 style={{padding: '24px'}}><FormattedMessage id='How much?' /></h3>} modal open={this.props.quantitySelection.open}>
        <TextField ref='q' floatingLabelText={<FormattedMessage id='Enter quantity' />} onKeyDown={this.handleOnKeyDown} />
      </Dialog>
    )
  }
})

export default connect(
  (state) => ({
    quantitySelection: state.quantitySelection,
    activeBasket: state.basket
  }),
  {
    quantitySelectToggle() {
      return {type: 'QUANTITY_SELECT_TOGGLE'}
    },
    basketCreateAndFill(product) {
      return {
        type: 'BASKET_ADD',
        httpRequest: {
          method: 'POST',
          url: '/api/basket/fill',
          json: true,
          body: {
            repositoryId: product.repositoryId,
            quantity: product.quantity,
            basketId: product.basketId
          }
        }
      }
    }
  }
)(QuantitySelection)
