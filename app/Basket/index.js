import React from 'react'
import {connect} from 'react-redux'
import Product from './product'
import Table from 'material-ui/Table/Table'
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn'
import TableRow from 'material-ui/Table/TableRow'
import TableHeader from 'material-ui/Table/TableHeader'
import TableBody from 'material-ui/Table/TableBody'
import Card from 'material-ui/Card/Card'
import CardTitle from 'material-ui/Card/CardTitle'

const Basket = React.createClass({
  propTypes: {
    data: React.PropTypes.array
  },
  getDefaultProps() {
    return {
      data: []
    }
  },
  render() {
    return (
      <div>
        <Card>
          <CardTitle style={{background: '#ccc', textAlign: 'right', fontWeight: 'bold', fontSize: '26pt'}}>{Math.round(this.props.data.reduce((cur, next) => {
            return cur + (next.quantity * next.price)
          }, 0) * 100) / 100}</CardTitle>
        </Card>
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn style={{width: '100px'}}>Quantity</TableHeaderColumn>
              <TableHeaderColumn style={{width: '100px'}}>Price</TableHeaderColumn>
              <TableHeaderColumn style={{width: '100px'}}>Total</TableHeaderColumn>
              <TableHeaderColumn style={{width: '30px'}}>&nbsp;</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.props.data.map((p) => {
              return <Product key={p.id} value={p} />
            })}
          </TableBody>
        </Table>
      </div>
    )
  }
})

export default connect(
  (state) => (state.basket)
)(Basket)
