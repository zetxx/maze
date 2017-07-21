import React from 'react'
import {connect} from 'react-redux'
import DropDownMenu from 'material-ui/DropDownMenu/DropDownMenu'
import MenuItem from 'material-ui/MenuItem/MenuItem'
import {Translate} from '../../Translation'
import {actionList} from './reducers'

const QuantityTypeDropdown = React.createClass({
  propTypes: {
    fetch: React.PropTypes.func,
    handleChange: React.PropTypes.func,
    value: React.PropTypes.number,
    items: React.PropTypes.object
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
        type: actionList.FETCH, httpRequest: {
          method: 'GET',
          url: '/api/quantityType',
          json: true
        }
      }
    }
  },
  null,
  {withRef: true}
)(QuantityTypeDropdown)