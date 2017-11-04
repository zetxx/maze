import {connect} from 'react-redux'
import {Interaction} from '../Interaction'
import {save, add, change} from './actions'

export default connect(
  (state) => ({
    availableRoles: state.roles,
    priceRuleGroups: state.userAdd.get('priceRuleGroups'),
    userDetails: state.userAdd.get('data'),
    opened: state.userAdd.get('opened'),
    title: 'Add User'
  }),
  {save, add, change}
)(Interaction)
