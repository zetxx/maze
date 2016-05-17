import React from 'react'
import TableRowColumn from 'material-ui/Table/TableRowColumn'
import TableRow from 'material-ui/Table/TableRow'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'

export default class Product extends React.Component {
  render() {
    return (
      <TableRow>
        <TableRowColumn>{this.props.value.product.name}</TableRowColumn>
        <TableRowColumn style={{width: '100px'}}>{this.props.value.transaction.quantity}</TableRowColumn>
        <TableRowColumn style={{width: '100px'}}>{this.props.value.repository.price}</TableRowColumn>
        <TableRowColumn style={{width: '100px'}}>{Math.round((this.props.value.transaction.quantity * this.props.value.repository.price) * 100) / 100}</TableRowColumn>
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
