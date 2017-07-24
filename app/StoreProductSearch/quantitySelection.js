import React from 'react'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog/Dialog'
import TextField from 'material-ui/TextField'
import {Translate} from '../Translation'
import {actionList} from './reducers'
import {actionList as actionListBasket} from '../Basket/reducers'

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
            repositoryId: product.repositories[0].id,
            quantity: product.quantity,
            basketId: product.basketId
          }
        }
      }
    }
  }
)(QuantitySelection)
