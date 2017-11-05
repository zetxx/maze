import {connect} from 'react-redux'
import {Interaction} from '../Interaction'
import {save, edit, change, get} from './actions'

export default connect(
  (state) => ({
    availableRoles: state.roles,
    priceRuleGroups: state.userEdit.get('priceRuleGroups'),
    userDetails: state.userEdit.get('data'),
    opened: state.userEdit.get('opened'),
    userId: state.userEdit.get('userId'),
    title: 'Edit User'
  }),
  {get, save, edit, change}
)(Interaction)
