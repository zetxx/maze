import React from 'react'
import Product from './product'
import Table from 'material-ui/lib/table/table'
import TableHeaderColumn from 'material-ui/lib/table/table-header-column'
import TableRow from 'material-ui/lib/table/table-row'
import TableHeader from 'material-ui/lib/table/table-header'
import TableBody from 'material-ui/lib/table/table-body'

export default class Basket extends React.Component {

  render() {
    return (
      <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Quantity</TableHeaderColumn>
            <TableHeaderColumn>Price</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.props.data.map((p) => {
            return <Product key={p.id} value={p}/>
          })}
        </TableBody>
      </Table>
    )
  }
}

Basket.propTypes = {
  data: React.PropTypes.array
}
