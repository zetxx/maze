import React from 'react'
import {connect} from 'react-redux'
import {setTitle} from '../Heading/actions'
// import {FormattedMessage} from 'react-intl'

const Config = React.createClass({
  propTypes: {
    setTitle: React.PropTypes.func
  },
  componentDidMount() {
    this.props.setTitle('Config')
  },
  render() {
    return (
      <div>
        config
      </div>
    )
  }
})

export default connect(
  null,
  {setTitle}
)(Config)
