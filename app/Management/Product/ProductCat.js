import React from 'react'
import {connect} from 'react-redux'
import DropDownMenu from 'material-ui/DropDownMenu/DropDownMenu'
import MenuItem from 'material-ui/MenuItem/MenuItem'

const ProductCat = React.createClass({
  propTypes: {
    fetch: React.PropTypes.func,
    handleChange: React.PropTypes.func,
    value: React.PropTypes.number,
    productCategories: React.PropTypes.object
  },
  getInitialState() {
    return {value: this.props.value}
  },
  componentWillMount() {
    if (!this.props.productCategories.status) {
      this.props.fetch()
    }
  },
  handleChange(event, index, value) {
    this.setState({value: value})
  },
  getValue() {
    return this.props.productCategories.data[this.state.value - 1].id
  },
  render() {
    return (
      <DropDownMenu ref='dropdown' value={this.state.value} onChange={this.handleChange}>
        {this.props.productCategories.data && this.props.productCategories.data.map((el, idx) => {
          return (
            <MenuItem value={idx + 1} key={idx} primaryText={el.name} />
          )
        })}
      </DropDownMenu>
    )
  }
})

export default connect(
  (state) => ({productCategories: state.productCategories}),
  {
    fetch() {
      return {
        type: 'FETCH_PRODUCT_CATEGORIES', httpRequest: {
          method: 'GET',
          url: '/api/productCategory',
          json: true
        }
      }
    }
  },
  null,
  {withRef: true}
)(ProductCat)
