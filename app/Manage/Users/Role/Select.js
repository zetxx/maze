import React, {PropTypes} from 'react'
import Immutable from 'immutable'
import Checkbox from 'material-ui/Checkbox'

const Role = React.createClass({
  propTypes: {
    props: PropTypes.object,
    data: PropTypes.object,
    handleChange: PropTypes.func
  },
  onCheck(e, state) {
    this.props.handleChange('role', this.props.props.get('id'), state)
  },
  render() {
    return (
      <Checkbox onCheck={this.onCheck} defaultChecked={this.props.data.get(this.props.props.get('name'))} label={this.props.props.get('name')} />
    )
  }
})

Role.defaultProps = {
  props: Immutable.Map(),
  data: Immutable.Map(),
  handleChange: () => {}
}

export default Role
