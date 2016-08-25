import {connect} from 'react-redux'
import {Interaction} from '../Interaction'
import {save, add, change} from './actions'

export default connect(
  (state) => ({
    title: 'Add Role',
    opened: state.roleAdd.get('opened')
  }),
  {save, add, change}
)(Interaction)
