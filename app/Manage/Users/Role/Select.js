import React, {PropTypes} from 'react'
import Immutable from 'immutable'
import Checkbox from 'material-ui/Checkbox'

const Role = React.createClass({
  propTypes: {
    props: PropTypes.object,
    defaultChecked: PropTypes.bool,
    handleChange: PropTypes.func
  },
  onCheck(e, state) {
    this.props.handleChange('roles', this.props.props.get('id'), state)
  },
  render() {
    return (
      <Checkbox onCheck={this.onCheck} defaultChecked={this.props.defaultChecked} label={this.props.props.get('name')} />
    )
  }
})

Role.defaultProps = {
  props: Immutable.Map(),
  handleChange: () => {}
}

export default Role