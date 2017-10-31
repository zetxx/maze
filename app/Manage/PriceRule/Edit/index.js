import {connect} from 'react-redux'
import {List} from 'immutable'
import {Interaction} from '../Interaction'
import {save, edit, change, get} from './actions'
import {fetch} from '../../Actions/actions'

export default connect(
  (state) => ({
    title: 'Edit Role',
    opened: state.roleEdit.get('opened'),
    actions: (state.actions.get('data') || List()).toJS(),
    name: state.roleEdit.get('name'),
    roleId: state.roleEdit.get('roleId'),
    permissions: state.roleEdit.get('permissions' || Map()).toJS()
  }),
  {save, edit, change, fetch, get}
)(Interaction)
