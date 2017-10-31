import React from 'react'
import {connect} from 'react-redux'
import DropDownMenu from 'material-ui/DropDownMenu/DropDownMenu'
import MenuItem from 'material-ui/MenuItem/MenuItem'
import PropTypes from 'prop-types'
import createClass from 'create-react-class'

const ProductCatDropDown = createClass({
  propTypes: {
    fixTop: PropTypes.bool,
    fetch: PropTypes.func,
    handleChange: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.number,
    productCategories: PropTypes.object
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
    if (this.props.onChange) {
      this.props.onChange({target: {value}})
    }
  },
  getValue() {
    return this.state.value
  },
  render() {
    return (
      <DropDownMenu ref='dropdown' value={this.state.value} onChange={this.handleChange}>
        {this.props.productCategories.data && this.props.productCategories.data.map((el, idx) => {
          return (
            <MenuItem value={el.id} key={idx} primaryText={el.name} />
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
        type: 'FETCH',
        httpRequest: {
          method: 'GET',
          url: '/api/productCategories',
          json: true
        }
      }
    }
  },
  null,
  {withRef: true}
)(ProductCatDropDown)
