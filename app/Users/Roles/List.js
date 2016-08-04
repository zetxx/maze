import React from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable'
import {Card} from 'material-ui/Card'
import AppBar from 'material-ui/AppBar/AppBar'
import {Translate} from '../../Translation'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import {Table, TableHeaderColumn, TableRow, TableHeader, TableBody, TableRowColumn} from 'material-ui/Table'
import IconButton from 'material-ui/IconButton/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import {list, get, add, edit} from './actions'

const Roles = React.createClass({
  propTypes: {
    list: React.PropTypes.func,
    get: React.PropTypes.func,
    add: React.PropTypes.func,
    edit: React.PropTypes.func,
    roles: React.PropTypes.object
  },
  componentDidMount() {
    this.props.list()
  },
  getDefaultProps: function() {
    return {
      roles: {data: []}
    }
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
  (state) => ({roles: state.roles}),
  {get, list, add, edit}
)(Roles)
