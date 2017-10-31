import React from 'react'
import {connect} from 'react-redux'
import {setTitle} from '../../Heading/actions'
import Roles from './Roles'
import User from './User'
import PriceRules from '../PriceRules/List'
import PropTypes from 'prop-types'
import createClass from 'create-react-class'

const UserConfig = createClass({
  propTypes: {
    setTitle: PropTypes.func
  },
  componentDidMount() {
    this.props.setTitle('Users')
  },
  render() {
    return (
      <div>
        <User />
        <Roles />
        <div style={{display: 'block', overflow: 'hidden', clear: 'both', height: '12px'}} />
        <PriceRules />
      </div>
    )
  }
})

export default connect(
  null,
  {setTitle}
)(UserConfig)
