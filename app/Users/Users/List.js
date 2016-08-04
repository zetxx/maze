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
import {list, get, add, edit} from './actions'

const Users = React.createClass({
  propTypes: {
    list: React.PropTypes.func,
    get: React.PropTypes.func,
    add: React.PropTypes.func,
    edit: React.PropTypes.func,
    users: React.PropTypes.object
  },
  componentDidMount() {
    this.props.list()
  },
  getDefaultProps: function() {
    return {
      users: {data: []}
    }
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
                  <IconButton><EditIcon /></IconButton>
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    )
  }
})

export default connect(
  (state) => ({users: state.users}),
  {list, get, add, edit}
)(Users)
