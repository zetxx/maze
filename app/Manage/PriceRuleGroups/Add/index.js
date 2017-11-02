import {connect} from 'react-redux'
import {Interaction} from '../Interaction'
import {save, add, change} from './actions'

export default connect(
  (state) => ({
    title: 'Add Price Rule',
    opened: state.priceRuleAdd.get('opened'),
    fieldValues: state.priceRuleAdd.get('fieldValues')
  }),
  {save, add, change}
)(Interaction)
