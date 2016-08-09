import React from 'react'
import {connect} from 'react-redux'
// import {Card} from 'material-ui/Card'
// import {Translate} from '../../../Translation'
// import FlatButton from 'material-ui/FlatButton/FlatButton'
import {get, save} from './actions'

export const Edit = React.createClass({
  propTypes: {
    get: React.PropTypes.func,
    save: React.PropTypes.func,
    roles: React.PropTypes.object
  },
  componentDidMount() {
  },
  getDefaultProps: function() {
    return {}
  },
  render() {
    return (
      <div>
        edit
      </div>
    )
  }
})

export default connect(
  (state) => ({user: state.user, roles: state.roles}),
  {get, save}
)(Edit)
