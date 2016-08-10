import {connect} from 'react-redux'
import {Interaction} from '../Interaction'
import {save, edit, change} from './actions'
import {get as getUserRoles} from '../../UserRoles/actions'

export default connect(
  (state) => ({
    roles: state.roles,
    userRoles: state.userRoles,
    opened: state.userEdit.get('opened'),
    title: 'Edit User'
  }),
  {getUserRoles, save, edit, change}
)(Interaction)
