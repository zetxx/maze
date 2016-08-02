import React from 'react'
import {connect} from 'react-redux'
import {setTitle} from '../Heading/actions'
import Groups from './Groups'
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
        <Groups />
      </div>
    )
  }
})

export default connect(
  null,
  {setTitle}
)(UserConfig)
