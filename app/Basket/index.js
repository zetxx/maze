import React from 'react'
import Product from './product'
import Table from 'material-ui/Table/Table'
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn'
import TableRow from 'material-ui/Table/TableRow'
import TableHeader from 'material-ui/Table/TableHeader'
import TableBody from 'material-ui/Table/TableBody'
import Card from 'material-ui/Card/Card'
import CardTitle from 'material-ui/Card/CardTitle'

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
