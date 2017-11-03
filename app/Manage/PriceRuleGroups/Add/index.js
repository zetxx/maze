import {connect} from 'react-redux'
import {Interaction} from '../Interaction'
import {save, add, change} from './actions'

export default connect(
  (state) => ({
    title: 'Add Price Rule Group',
    opened: state.priceRuleGroupsAdd.get('opened'),
    priceRules: state.priceRuleGroupsAdd.get('priceRules'),
    priceRulesSelected: (state.priceRuleGroupsAdd.get && state.priceRuleGroupsAdd.get('priceRulesSelected').toJS()) || [],
    fieldValues: state.priceRuleGroupsAdd.get('fieldValues')
  }),
  {save, add, change}
)(Interaction)
