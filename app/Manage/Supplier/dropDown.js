import React from 'react'
import {connect} from 'react-redux'
import DropDownMenu from 'material-ui/DropDownMenu/DropDownMenu'
import MenuItem from 'material-ui/MenuItem/MenuItem'
import PropTypes from 'prop-types'
import createClass from 'create-react-class'

const SupplierDropDown = createClass({
  propTypes: {
    fetch: PropTypes.func,
    handleChange: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.number,
    suppliers: PropTypes.object
  },
  getInitialState() {
    return {value: this.props.value}
  },
  componentWillMount() {
    if (!this.props.suppliers.status) {
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
    if (this.props.suppliers.data.length) {
      return this.props.suppliers.data[this.state.value - 1].id
    }
  },
  render() {
    return (
      <DropDownMenu ref='dropdown' value={this.state.value} onChange={this.handleChange}>
        {this.props.suppliers.data && this.props.suppliers.data.filter((el) => el.enabled).map((el, idx) => {
          return (
            <MenuItem value={idx + 1} key={idx} primaryText={el.name} />
          )
        })}
      </DropDownMenu>
    )
  }
})

export default connect(
  (state) => ({suppliers: state.suppliers}),
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
)(SupplierDropDown)
