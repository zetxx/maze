import React from 'react'
import Card from 'material-ui/Card/Card'
import AppBar from 'material-ui/AppBar/AppBar'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import {Table, TableHeaderColumn, TableRow, TableHeader, TableBody, TableRowColumn} from 'material-ui/Table'
import IconButton from 'material-ui/IconButton/IconButton'
import EjectIcon from 'material-ui/svg-icons/action/eject'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'

export default class Product extends React.Component {
  render() {
    return (
      <Card>
        <AppBar
          title={<span>Product</span>}
          iconElementRight={<FlatButton label='Add' />}
        />

        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Quantity</TableHeaderColumn>
              <TableHeaderColumn>Price</TableHeaderColumn>
              <TableHeaderColumn>&nbsp;</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>this.props.value.quanti</TableRowColumn>
              <TableRowColumn>this.props.value.price</TableRowColumn>
              <TableRowColumn>
                <IconButton><EjectIcon /></IconButton>
                <IconButton><EditIcon /></IconButton>
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    )
  }
}
