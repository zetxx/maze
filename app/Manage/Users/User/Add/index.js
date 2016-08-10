import {connect} from 'react-redux'
import {Interaction} from '../Interaction'
import {save, add, change} from './actions'

export default connect(
  (state) => ({
    roles: state.roles,
    opened: state.userAdd.get('opened'),
    title: 'Add User'
  }),
  {save, add, change}
)(Interaction)
