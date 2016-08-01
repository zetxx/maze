import React from 'react'
import {connect} from 'react-redux'
import {setTitle} from '../Heading/actions'

const Users = React.createClass({
  propTypes: {
    setTitle: React.PropTypes.func
  },
  componentDidMount() {
    this.props.setTitle('Users')
  },
  render() {
    return (
      <div>
        <div>Users</div>
        <div>User groups</div>
      </div>
    )
  }
})

export default connect(
  null,
  {setTitle}
)(Users)
