import {connect} from 'react-redux'
import {Interaction} from '../Interaction'
import {save, edit, change} from './actions'

export default connect(
  (state) => {
    return {
      title: 'Edit Price Rule Group',
      opened: state.priceRuleGroupsEdit.get('opened'),
      priceRules: state.priceRuleGroupsEdit.get('priceRules'),
      priceRuleGroupId: state.priceRuleGroupsEdit.get('priceRuleGroupId'),
      priceRulesSelected: (state.priceRuleGroupsEdit.get && state.priceRuleGroupsEdit.get('priceRulesSelected').toJS()) || [],
      fieldValues: state.priceRuleGroupsEdit.get('fieldValues')
    }
  },
  {save, edit, change}
)(Interaction)
