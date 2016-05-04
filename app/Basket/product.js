import React from 'react'
import TableRowColumn from 'material-ui/Table/TableRowColumn'
import TableRow from 'material-ui/Table/TableRow'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'

export default class Product extends React.Component {
  render() {
    return (
      <TableRow>
        <TableRowColumn>{this.props.value.title}</TableRowColumn>
        <TableRowColumn style={{width: '100px'}}>{this.props.value.quantity}</TableRowColumn>
        <TableRowColumn style={{width: '100px'}}>{this.props.value.price}</TableRowColumn>
        <TableRowColumn style={{width: '30px'}}>
          <IconButton><DeleteIcon /></IconButton>
        </TableRowColumn>
      </TableRow>
    )
  }
}

Product.propTypes = {
  value: React.PropTypes.object
}
