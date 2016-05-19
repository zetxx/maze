import React from 'react'
import {FormattedHTMLMessage} from 'react-intl'
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
        <TableRowColumn style={{width: '100px'}}>{this.props.value.repository.price} <FormattedHTMLMessage id='_currency' /></TableRowColumn>
        <TableRowColumn style={{width: '100px'}}>{Math.round((this.props.value.transaction.quantity * this.props.value.repository.price) * 100) / 100} <FormattedHTMLMessage id='_currency' /></TableRowColumn>
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
