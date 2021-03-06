import React from 'react'
import {connect} from 'react-redux'
import {Translate} from '../Translation'
import Product from './product'
import Table from 'material-ui/Table/Table'
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn'
import TableRow from 'material-ui/Table/TableRow'
import TableHeader from 'material-ui/Table/TableHeader'
import TableBody from 'material-ui/Table/TableBody'
import Card from 'material-ui/Card/Card'
import CardTitle from 'material-ui/Card/CardTitle'
import {actionList} from './reducers'
import PropTypes from 'prop-types'
import createClass from 'create-react-class'

const Basket = createClass({
  propTypes: {
    products: PropTypes.array,
    fetch: PropTypes.func,
    newBasket: PropTypes.func,
    id: PropTypes.number,
    basketId: PropTypes.any
  },
  contextTypes: {
    router: PropTypes.object.isRequired
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
    if (newProps.basketId === 0 || (newProps.basketId > 0 && newProps.id === 0)) {
      this.context.router.push('/store')
      this.props.newBasket()
    } else if (!isNaN(newProps.basketId)) {
      if (newProps.basketId !== this.props.basketId) {
        this.props.fetch(newProps.basketId)
      } else if ((newProps.action === 'new' || newProps.action === 'close') && newProps.basketId) {
        this.context.router.push('/store')
        this.props.newBasket()
      } else if (newProps.action === 'reassign') {
        if (newProps.basketId === newProps.id) {
          this.props.fetch(newProps.basketId)
        } else if (newProps.basketId !== newProps.id) {
          this.context.router.push(['/store', newProps.id].join('/'))
        }
      }
    } else if (isNaN(newProps.basketId) && newProps.id) {
      this.context.router.push(['/store', newProps.id].join('/'))
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
            return cur + (next.transaction.quantity * next.product.price)
          }, 0) * 100) / 100}</CardTitle>
        </Card>
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn style={{width: '100px'}}>Name</TableHeaderColumn>
              <TableHeaderColumn style={{width: '30px'}}><Translate id='Quantity' /></TableHeaderColumn>
              <TableHeaderColumn style={{width: '100px'}}><Translate id='Price' /></TableHeaderColumn>
              <TableHeaderColumn style={{width: '100px'}}><Translate id='Total' /></TableHeaderColumn>
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
    newBasket() {
      return {type: actionList.NEW}
    },
    fetch(basketId) {
      return {
        type: actionList.FETCH,
        httpRequest: {
          method: 'GET',
          url: `/api/baskets/${basketId}`,
          json: true
        }
      }
    }
  }
)(Basket)
