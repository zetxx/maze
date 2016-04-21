import React from 'react'
import TableRowColumn from 'material-ui/lib/table/table-row-column'
import TableRow from 'material-ui/lib/table/table-row'
import IconButton from 'material-ui/lib/icon-button'
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete'

export default class Product extends React.Component {
  render() {
    return (
      <TableRow>
        <TableRowColumn>{this.props.value.title}</TableRowColumn>
        <TableRowColumn style={{width: '100px'}}>{this.props.value.quantity}</TableRowColumn>
        <TableRowColumn style={{width: '100px'}}>{this.props.value.price}</TableRowColumn>
        <TableRowColumn style={{width: '30px'}}>
          <IconButton><DeleteIcon/></IconButton>
        </TableRowColumn>
      </TableRow>
    )
  }
}

Product.propTypes = {
  value: React.PropTypes.object
}
