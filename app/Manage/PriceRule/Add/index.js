import {connect} from 'react-redux'
import {List} from 'immutable'
import {Interaction} from '../Interaction'
import {save, add, change} from './actions'
import {fetch} from '../../Actions/actions'

export default connect(
  (state) => ({
    title: 'Add Role',
    opened: state.roleAdd.get('opened'),
    actions: (state.actions.get('data') || List()).toJS(),
    name: state.roleAdd.get('name'),
    permissions: state.roleAdd.get('permissions' || Map()).toJS()
  }),
  {save, add, change, fetch}
)(Interaction)
