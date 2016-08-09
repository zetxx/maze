import {connect} from 'react-redux'
import {Add} from '../Add'
import {save, edit, change} from './actions'
import {get as getUserRoles} from '../../UserRoles/actions'

export default connect(
  (state) => ({
    roles: state.roles,
    userRoles: state.userRoles,
    opened: state.userEdit.get('opened')
  }),
  {getUserRoles, save, edit, change}
)(Add)
