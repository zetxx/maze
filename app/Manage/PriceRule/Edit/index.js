import {connect} from 'react-redux'
import {Interaction} from '../Interaction'
import {save, edit, change} from './actions'

export default connect(
  (state) => {
    return {
      title: 'Edit Price Rule',
      opened: state.priceRuleEdit.get('opened'),
      priceRuleId: state.priceRuleEdit && state.priceRuleEdit.get('priceRuleId'),
      fieldValues: state.priceRuleEdit && state.priceRuleEdit.get('fieldValues')
    }
  },
  {save, edit, change}
)(Interaction)
