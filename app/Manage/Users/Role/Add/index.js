import {connect} from 'react-redux'
import {Interaction} from '../Interaction'
import {save, add, change} from './actions'
import {fetch} from '../../Actions/actions'

export default connect(
  (state) => ({
    title: 'Add Role',
    opened: state.roleAdd.get('opened'),
    actions: state.actions.get('data')
  }),
  {save, add, change, fetch}
)(Interaction)
