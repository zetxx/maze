import React from 'react'
import {connect} from 'react-redux'
// import {Card} from 'material-ui/Card'
// import {Translate} from '../../../Translation'
// import FlatButton from 'material-ui/FlatButton/FlatButton'
import {save} from './actions'

export const Add = React.createClass({
  propTypes: {
    roles: React.PropTypes.object,
    save: React.PropTypes.func
  },
  getDefaultProps: function() {
    return {}
  },
  render() {
    console.log(this.props.roles.toJS())
    return (
      <div>
        add
      </div>
    )
  }
})

export default connect(
  (state) => ({roles: state.roles}),
  {save}
)(Add)
