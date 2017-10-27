import React from 'react'
import {connect} from 'react-redux'
import {Card} from 'material-ui/Card'
import AppBar from 'material-ui/AppBar/AppBar'
import {Translate} from '../../../Translation'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import {Table, TableHeaderColumn, TableRow, TableHeader, TableBody, TableRowColumn} from 'material-ui/Table'
import IconButton from 'material-ui/IconButton/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import Add from './Add'
import Edit from './Edit'
import PasswordReset from './PasswordReset'
import {fetch} from './actions'
import {add} from './Add/actions'
import {edit} from './Edit/actions'
import {fetch as priceRuleFetch} from '../../PriceRules/actions'

const Users = React.createClass({
  propTypes: {
    priceRuleFetch: React.PropTypes.func,
    fetch: React.PropTypes.func,
    add: React.PropTypes.func,
    edit: React.PropTypes.func,
    users: React.PropTypes.object,
    addFetchTriggerId: React.PropTypes.number,
    editFetchTriggerId: React.PropTypes.number
  },
  componentDidMount() {
    this.props.fetch()
  },
  shouldComponentUpdate(newProps) {
    if (this.props.addFetchTriggerId !== newProps.addFetchTriggerId || this.props.editFetchTriggerId !== newProps.editFetchTriggerId) {
      this.props.fetch()
      return false
    }
    return true
  },
  defaultProps: {
    users: {data: []}
  },
  handleEdit(userId) {
    return () => (this.props.priceRuleFetch() & this.props.edit(userId))
  },
  handleAdd() {
    this.props.priceRuleFetch()
    this.props.add()
  },
  render() {
    return (
      <Card style={{float: 'left', marginRight: '1%', width: '59%'}}>
        <AppBar
          title={<Translate id='Users' />}
          iconElementRight={<FlatButton label={<Translate id='Add' />} onTouchTap={this.handleAdd} />}
        />

        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn><Translate id='User Name' /></TableHeaderColumn>
              <TableHeaderColumn><Translate id='E-mail' /></TableHeaderColumn>
              <TableHeaderColumn><Translate id='Roles' /></TableHeaderColumn>
              <TableHeaderColumn style={{width: '100px'}}><Translate id='Operations' /></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {(this.props.users.get('data') || []).map((el) => (
              <TableRow key={el.get('id')}>
                <TableRowColumn>{el.get('userName')}</TableRowColumn>
                <TableRowColumn>{el.get('email')}</TableRowColumn>
                <TableRowColumn>{el.get('roles')}</TableRowColumn>
                <TableRowColumn style={{width: '100px'}}>
                  <IconButton><DeleteIcon /></IconButton>
                  <IconButton onTouchTap={this.handleEdit(el.get('id'))}><EditIcon /></IconButton>
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Add ref='add' />
        <Edit ref='edit' />
        <PasswordReset />
      </Card>
    )
  }
})

export default connect(
  (state) => ({
    users: state.users,
    addFetchTriggerId: state.userAdd.get('fetchTriggerId'),
    editFetchTriggerId: state.userEdit.get('fetchTriggerId')
  }),
  {fetch, add, edit, priceRuleFetch}
)(Users)
