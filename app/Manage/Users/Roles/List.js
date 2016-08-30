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
import {fetch, get} from './actions'
import Add from '../Role/Add'
import Edit from '../Role/Edit'
import {add} from '../Role/Add/actions'
import {edit} from '../Role/Edit/actions'

const Roles = React.createClass({
  propTypes: {
    fetch: React.PropTypes.func,
    get: React.PropTypes.func,
    add: React.PropTypes.func,
    edit: React.PropTypes.func,
    roles: React.PropTypes.object,
    addFetchTriggerId: React.PropTypes.number,
    editFetchTriggerId: React.PropTypes.number
  },
  componentDidMount() {
    this.props.fetch()
  },
  shouldComponentUpdate(newProps) {
    if (this.props.addFetchTriggerId !== newProps.addFetchTriggerId || this.props.editFetchTriggerId !== newProps.editFetchTriggerId) {
      newProps.fetch()
      return false
    }
    return true
  },
  getDefaultProps: function() {
    return {
      roles: {data: []}
    }
  },
  handleEdit(roleId) {
    return () => (this.props.edit(roleId))
  },
  render() {
    return (
      <Card style={{float: 'left', width: '40%'}}>
        <AppBar
          title={<Translate id='Roles' />}
          iconElementRight={<FlatButton label={<Translate id='Add' />} onTouchTap={this.props.add} />}
        />

        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn><Translate id='Name' /></TableHeaderColumn>
              <TableHeaderColumn style={{width: '100px'}}><Translate id='Operations' /></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {(this.props.roles.get('data') || []).map((el) => (
              <TableRow key={el.get('id')}>
                <TableRowColumn>{el.get('name')}</TableRowColumn>
                <TableRowColumn style={{width: '120px'}}>
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
})

export default connect(
  (state) => ({
    roles: state.roles,
    addFetchTriggerId: state.roleAdd.get('fetchTriggerId'),
    editFetchTriggerId: state.roleEdit.get('fetchTriggerId')
  }),
  {get, fetch, add, edit}
)(Roles)
