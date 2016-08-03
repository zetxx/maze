import React from 'react'
import {connect} from 'react-redux'
import {setTitle} from '../Heading/actions'
import Roles from './Roles'
import Users from './Users'

const UserConfig = React.createClass({
  propTypes: {
    setTitle: React.PropTypes.func
  },
  componentDidMount() {
    this.props.setTitle('Users')
  },
  render() {
    return (
      <div>
        <Users />
        <Roles />
      </div>
    )
  }
})

export default connect(
  null,
  {setTitle}
)(UserConfig)
