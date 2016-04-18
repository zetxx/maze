import React from 'react'
import TableRowColumn from 'material-ui/lib/table/table-row-column'
import TableRow from 'material-ui/lib/table/table-row'

export default class Product extends React.Component {
  render() {
    return (
      <TableRow>
        <TableRowColumn>{this.props.value.title}</TableRowColumn>
        <TableRowColumn>{this.props.value.quantity}</TableRowColumn>
        <TableRowColumn>{this.props.value.price}</TableRowColumn>
      </TableRow>
    )
  }
}

Product.propTypes = {
  value: React.PropTypes.object
}
