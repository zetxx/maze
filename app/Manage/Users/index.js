import React from 'react'
import {connect} from 'react-redux'
import {setTitle} from '../../Heading/actions'
import Roles from './Roles'
import User from './User'

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
        <User />
        <Roles />
      </div>
    )
  }
})

export default connect(
  null,
  {setTitle}
)(UserConfig)