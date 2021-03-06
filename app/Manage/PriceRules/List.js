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
import Add from '../PriceRule/Add'
import Edit from '../PriceRule/Edit'
import {add} from '../PriceRule/Add/actions'
import {edit} from '../PriceRule/Edit/actions'
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
      <Card style={{float: 'left', width: '59%', marginRight: '1%'}}>
        <AppBar
          title={<Translate id='Price Rules' />}
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
            {(this.props.priceRules.get('data') || []).map((el) => (
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
        <Edit ref='edit' />
      </Card>
    )
  }
}

Roles.propTypes = {
  fetch: PropTypes.func,
  get: PropTypes.func,
  add: PropTypes.func,
  edit: PropTypes.func,
  priceRules: PropTypes.object,
  addFetchTriggerId: PropTypes.number,
  editFetchTriggerId: PropTypes.number
}

export default connect(
  (state) => ({
    priceRules: state.priceRules,
    addFetchTriggerId: state.priceRuleAdd.get('fetchTriggerId'),
    editFetchTriggerId: state.priceRuleEdit.get('fetchTriggerId')
  }),
  {get, fetch, add, edit}
)(Roles)
