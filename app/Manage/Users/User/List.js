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
import {fetch} from './actions'
import {add} from './Add/actions'
import {edit} from './Edit/actions'

const Users = React.createClass({
  propTypes: {
    fetch: React.PropTypes.func,
    add: React.PropTypes.func,
    edit: React.PropTypes.func,
    users: React.PropTypes.object,
    addTrigger: React.PropTypes.number,
    editTrigger: React.PropTypes.number
  },
  componentDidMount() {
    this.props.fetch()
  },
  shouldComponentUpdate(newProps) {
    if (this.props.addTrigger !== newProps.addTrigger || this.props.editTrigger !== newProps.editTrigger) {
      newProps.fetch()
      return false
    }
    return true
  },
  defaultProps: {
    users: {data: []}
  },
  handleEdit(userId) {
    return () => (this.props.edit(userId))
  },
  render() {
    return (
      <Card style={{float: 'left', marginRight: '1%', width: '59%'}}>
        <AppBar
          title={<Translate id='Users' />}
          iconElementRight={<FlatButton label={<Translate id='Add' />} onTouchTap={this.props.add} />}
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
      </Card>
    )
  }
})

export default connect(
  (state) => ({
    users: state.users,
    addTrigger: state.userAdd.get('triggerId'),
    editTrigger: state.userEdit.get('triggerId')
  }),
  {fetch, add, edit}
)(Users)
