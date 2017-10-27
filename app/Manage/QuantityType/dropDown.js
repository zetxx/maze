import React from 'react'
import {connect} from 'react-redux'
import DropDownMenu from 'material-ui/DropDownMenu/DropDownMenu'
import MenuItem from 'material-ui/MenuItem/MenuItem'
import {actionList} from './reducers'
import PropTypes from 'prop-types'
import createClass from 'create-react-class'

const QuantityTypeDropdown = createClass({
  propTypes: {
    fetch: PropTypes.func,
    handleChange: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.number,
    items: PropTypes.object
  },
  getInitialState() {
    return {value: this.props.value}
  },
  componentWillMount() {
    if (!this.props.items.status) {
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
    return this.props.items.data[this.state.value - 1].id
  },
  render() {
    return (
      <DropDownMenu ref='dropdown' value={this.state.value} onChange={this.handleChange}>
        {this.props.items.data && this.props.items.data.map((el, idx) => {
          return (
            <MenuItem value={el.id} key={idx} primaryText={el.name} />
          )
        })}
      </DropDownMenu>
    )
  }
})

export default connect(
  (state) => ({items: state.quantityTypes}),
  {
    fetch() {
      return {
        type: actionList.FETCH,
        httpRequest: {
          method: 'GET',
          url: '/api/quantityTypes',
          json: true
        }
      }
    }
  },
  null,
  {withRef: true}
)(QuantityTypeDropdown)
