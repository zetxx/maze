import React from 'react'
import {connect} from 'react-redux'
import Card from 'material-ui/Card/Card'
import Add from './Add'
import AppBar from 'material-ui/AppBar/AppBar'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import {Table, TableHeaderColumn, TableRow, TableHeader, TableBody, TableRowColumn} from 'material-ui/Table'
import {open as openDisableDialog, disableItemAction as disableItem} from '../../Components/DisableItem/reducers'
import IconButton from 'material-ui/IconButton/IconButton'
import EjectIcon from 'material-ui/svg-icons/action/eject'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import DisableItem from '../../Components/DisableItem'
import {Translate} from '../../Translation'
import {actionList} from './reducers.js'
import PropTypes from 'prop-types'

class Suppliers extends React.Component {
  componentDidMount() {
    this.props.fetch()
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.suppliers.nextFetchId !== nextProps.suppliers.nextFetchId) {
      this.props.fetch()
    }
  }
  openDisableDialog(itemId) {
    return () => {
      this.props.openDisableDialog({
        url: `/api/suppliers/${itemId}`,
        method: 'DELETE',
        disableAction: actionList.DISABLE_SUPPLIER,
        item: 'supplier',
        title: 'Disable Supplier?',
        body: 'Do you want to disable this supplier'
      })
    }
  }
  render() {
    return (
      <div>
        <Card>
          <AppBar
            title={<Translate id='Suppliers' />}
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
              {this.props.suppliers.data && this.props.suppliers.data.map((el) => (
                <TableRow key={el.id}>
                  <TableRowColumn style={{color: el.enabled ? 'green' : 'red'}}>{el.name}</TableRowColumn>
                  <TableRowColumn style={{width: '100px'}}>
                    <IconButton><EditIcon /></IconButton>
                    <IconButton><EjectIcon title={<Translate id='Disable' />} onTouchTap={this.openDisableDialog(el.id)} /></IconButton>
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <Add />
        <DisableItem item='supplier' disable={this.props.disableItem} />
      </div>
    )
  }
}

Suppliers.propTypes = {
  fetch: PropTypes.func,
  add: PropTypes.func,
  openDisableDialog: PropTypes.func,
  disableItem: PropTypes.func,
  suppliers: PropTypes.object
}

export default connect(
  (state) => ({suppliers: state.suppliers}),
  {
    fetch() {
      return {
        type: actionList.FETCH,
        httpRequest: {
          method: 'GET',
          url: '/api/suppliers',
          json: true
        }
      }
    },
    add() {
      return {type: actionList.TOGGLE_ADD}
    },
    openDisableDialog,
    disableItem: disableItem(actionList.DISABLE_SUPPLIER)
  }
)(Suppliers)
