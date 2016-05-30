import React from 'react'
import {connect} from 'react-redux'
import {setTitle} from '../Heading/actions'
// import {FormattedMessage} from 'react-intl'

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
        Users
      </div>
    )
  }
})

export default connect(
  null,
  {setTitle}
)(Users)
