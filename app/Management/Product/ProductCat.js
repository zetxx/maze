import React from 'react'
import {connect} from 'react-redux'
import DropDownMenu from 'material-ui/DropDownMenu/DropDownMenu'
import MenuItem from 'material-ui/MenuItem/MenuItem'

const ProductCat = React.createClass({
  propTypes: {
    fetch: React.PropTypes.func,
    productCategories: React.PropTypes.object
  },
  handleChange(event, index, value) {
    this.setState({value})
  },
  getInitialState() {
    return {value: 1}
  },
  componentWillMount() {
    if (!this.props.productCategories.status) {
      this.props.fetch()
    }
  },
  render() {
    return (
      <DropDownMenu ref='category' value={this.state.value} onChange={this.handleChange}>
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
  }
)(ProductCat)
