import React from 'react'
import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
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
    products: React.PropTypes.array,
    fetch: React.PropTypes.func,
    id: React.PropTypes.number,
    basketId: React.PropTypes.any
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getDefaultProps() {
    return {
      products: []
    }
  },
  componentDidMount(newProps) {
    if (!isNaN(this.props.basketId) && this.props.id === undefined) {
      this.props.fetch(this.props.basketId)
    }
  },
  componentWillReceiveProps(newProps) {
    if (newProps.isNew) {
      this.context.router.push(['/store', newProps.id].join('/'))
    } else if (!isNaN(newProps.basketId) && newProps.basketId !== newProps.id && typeof (newProps.id) === 'undefined' && newProps.clearBasket) {
      this.context.router.push('/store')
    } else if (!isNaN(newProps.basketId) && newProps.basketId !== newProps.id && typeof (newProps.id) !== 'undefined' && !newProps.clearBasket) {
      this.props.fetch(this.props.basketId)
    }
  },
  render() {
    var basketId = !isNaN(this.props.basketId) ? this.props.basketId : undefined

    if (!basketId) {
      return false
    }
    return (
      <div>
        <Card>
          <CardTitle style={{background: '#ccc', textAlign: 'right', fontWeight: 'bold', fontSize: '26pt'}}>{Math.round(this.props.products.reduce((cur, next) => {
            return cur + (next.transaction.quantity * next.repository.price)
          }, 0) * 100) / 100}</CardTitle>
        </Card>
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn style={{width: '100px'}}><FormattedMessage id='Quantity' /></TableHeaderColumn>
              <TableHeaderColumn style={{width: '100px'}}><FormattedMessage id='Price' /></TableHeaderColumn>
              <TableHeaderColumn style={{width: '100px'}}><FormattedMessage id='Total' /></TableHeaderColumn>
              <TableHeaderColumn style={{width: '30px'}}>&nbsp;</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.props.products.map((p, idx) => {
              return <Product key={idx} value={p} />
            })}
          </TableBody>
        </Table>
      </div>
    )
  }
})

export default connect(
  (state) => (state.basket),
  {
    fetch(basketId) {
      return {
        type: 'BASKET_FETCH',
        httpRequest: {
          method: 'GET',
          url: `/api/basket/${basketId}`,
          json: true
        }
      }
    }
  }
)(Basket)
