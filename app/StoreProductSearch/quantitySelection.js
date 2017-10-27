import React from 'react'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog/Dialog'
import TextField from 'material-ui/TextField'
import {Translate} from '../Translation'
import {actionList} from './reducers'
import {actionList as actionListBasket} from '../Basket/reducers'
import PropTypes from 'prop-types'
import createClass from 'create-react-class'

const QuantitySelection = createClass({
  propTypes: {
    quantitySelectToggle: PropTypes.func,
    basketCreateAndFill: PropTypes.func,
    focusSearch: PropTypes.func,
    quantitySelection: PropTypes.object,
    activeBasket: PropTypes.object
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
      <Dialog ref='dialog' title={<h3 style={{padding: '24px'}}><Translate id='How much?' /></h3>} modal open={this.props.quantitySelection.open}>
        <TextField ref='q' floatingLabelText={<Translate id='Enter quantity' />} onKeyDown={this.handleOnKeyDown} />
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
      return {type: actionList.TOGGLE}
    },
    basketCreateAndFill(product) {
      return {
        type: actionListBasket.ADD,
        httpRequest: {
          method: 'POST',
          url: '/api/baskets/fill',
          json: true,
          body: {
            repositoryId: product.repository.id,
            quantity: product.quantity,
            basketId: product.basketId
          }
        }
      }
    }
  }
)(QuantitySelection)
