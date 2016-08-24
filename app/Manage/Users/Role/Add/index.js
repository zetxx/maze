import {connect} from 'react-redux'
import {Interaction} from '../Interaction'
import {save, add, change} from './actions'

export default connect(
  (state) => ({
    availableRoles: state.roles,
    roleDetails: state.roleAdd.get('data'),
    opened: state.roleAdd.get('opened'),
    title: 'Add User'
  }),
  {save, add, change}
)(Interaction)
