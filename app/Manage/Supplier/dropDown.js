import React from 'react'
import {connect} from 'react-redux'
import DropDownMenu from 'material-ui/DropDownMenu/DropDownMenu'
import MenuItem from 'material-ui/MenuItem/MenuItem'

const SupplierDropDown = React.createClass({
  propTypes: {
    fetch: React.PropTypes.func,
    handleChange: React.PropTypes.func,
    value: React.PropTypes.number,
    suppliers: React.PropTypes.object
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
  },
  getValue() {
    return this.props.suppliers.data[this.state.value - 1].id
  },
  render() {
    return (
      <DropDownMenu ref='dropdown' value={this.state.value} onChange={this.handleChange}>
        {this.props.suppliers.data && this.props.suppliers.data.map((el, idx) => {
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
        type: 'FETCH', httpRequest: {
          method: 'GET',
          url: '/api/productCategory',
          json: true
        }
      }
    }
  },
  null,
  {withRef: true}
)(SupplierDropDown)
