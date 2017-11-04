import React from 'react'
import {connect} from 'react-redux'
import {Card} from 'material-ui/Card'
import AppBar from 'material-ui/AppBar/AppBar'
import {Translate} from '../../Translation'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import {Table, TableHeaderColumn, TableRow, TableHeader, TableBody, TableRowColumn} from 'material-ui/Table'
import IconButton from 'material-ui/IconButton/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import {fetch, get} from './actions'
import Add from './Add'
import Edit from './Edit'
import {add} from './Add/actions'
import {edit} from './Edit/actions'
import PropTypes from 'prop-types'

class Roles extends React.Component {
  constructor(p) {
    super(p)
    this.handleEdit = this.handleEdit.bind(this)
  }
  componentDidMount() {
    this.props.fetch()
  }
  shouldComponentUpdate(newProps) {
    if (this.props.addFetchTriggerId !== newProps.addFetchTriggerId || this.props.editFetchTriggerId !== newProps.editFetchTriggerId) {
      newProps.fetch()
      return false
    }
    return true
  }
  handleEdit(priceRuleId) {
    return () => (this.props.edit(priceRuleId))
  }
  render() {
    return (
      <Card style={{float: 'left', width: '40%'}}>
        <AppBar
          title={<Translate id='Price Rules Groups' />}
          iconElementRight={<FlatButton label={<Translate id='Add' />} onTouchTap={this.props.add} />}
        />

        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn><Translate id='Name' /></TableHeaderColumn>
              <TableHeaderColumn style={{width: '80px'}}><Translate id='Operations' /></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {((this.props.priceRuleGroups && this.props.priceRuleGroups.get('data')) || []).map((el) => (
              <TableRow key={el.get('id')}>
                <TableRowColumn>{el.get('name')}</TableRowColumn>
                <TableRowColumn style={{width: '80px'}}>
                  <IconButton><DeleteIcon /></IconButton>
                  <IconButton onTouchTap={this.handleEdit(el.get('id'))}><EditIcon /></IconButton>
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Add ref='add' />
        {<Edit ref='edit' />}
      </Card>
    )
  }
}

Roles.propTypes = {
  fetch: PropTypes.func,
  get: PropTypes.func,
  add: PropTypes.func,
  edit: PropTypes.func,
  priceRuleGroups: PropTypes.object,
  addFetchTriggerId: PropTypes.number,
  editFetchTriggerId: PropTypes.number
}

export default connect(
  (state) => ({
    priceRuleGroups: state.priceRuleGroups,
    addFetchTriggerId: state.priceRuleGroupsAdd && state.priceRuleGroupsAdd.get('fetchTriggerId'),
    editFetchTriggerId: state.priceRuleGroupsEdit && state.priceRuleGroupsEdit.get('fetchTriggerId')
  }),
  {get, fetch, add, edit}
)(Roles)
