import React from 'react'
import {connect} from 'react-redux'
import DropDownMenu from 'material-ui/DropDownMenu/DropDownMenu'
import MenuItem from 'material-ui/MenuItem/MenuItem'
import PropTypes from 'prop-types'
import createClass from 'create-react-class'

const ProductCat = createClass({
  propTypes: {
    fetch: PropTypes.func,
    handleChange: PropTypes.func,
    value: PropTypes.number,
    shops: PropTypes.object
  },
  getInitialState() {
    return {value: this.props.value}
  },
  componentWillMount() {
    if (!this.props.shops.status) {
      this.props.fetch()
    }
  },
  handleChange(event, index, value) {
    this.setState({value: value})
  },
  getValue() {
    return this.props.shops.data[this.state.value - 1].id
  },
  render() {
    return (
      <DropDownMenu ref='dropdown' value={this.state.value} onChange={this.handleChange}>
        {this.props.shops.data && this.props.shops.data.map((el, idx) => {
          return (
            <MenuItem value={idx + 1} key={idx} primaryText={el.name} />
          )
        })}
      </DropDownMenu>
    )
  }
})

export default connect(
  (state) => ({shops: state.shops}),
  {
    fetch() {
      return {
        type: 'FETCH_SHOPS',
        httpRequest: {
          method: 'GET',
          url: '/api/shops',
          json: true
        }
      }
    }
  },
  null,
  {withRef: true}
)(ProductCat)
