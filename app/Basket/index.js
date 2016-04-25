import React from 'react'
import Product from './product'
import Table from 'material-ui/table/table'
import TableHeaderColumn from 'material-ui/table/table-header-column'
import TableRow from 'material-ui/table/table-row'
import TableHeader from 'material-ui/table/table-header'
import TableBody from 'material-ui/table/table-body'
import Card from 'material-ui/card/card'
import CardTitle from 'material-ui/card/card-title'

export default class Basket extends React.Component {

  render() {
    return (
      <div>
        <Card>
          <CardTitle style={{background: '#ccc', textAlign: 'right', fontWeight: 'bold', fontSize: '26pt'}}>200.15</CardTitle>
        </Card>
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn style={{width: '100px'}}>Quantity</TableHeaderColumn>
              <TableHeaderColumn style={{width: '100px'}}>Price</TableHeaderColumn>
              <TableHeaderColumn style={{width: '30px'}}>&nbsp;</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.props.data.map((p) => {
              return <Product key={p.id} value={p}/>
            })}
          </TableBody>
        </Table>
      </div>
    )
  }
}

Basket.propTypes = {
  data: React.PropTypes.array
}
