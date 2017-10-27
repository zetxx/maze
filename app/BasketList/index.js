import React from 'react'
import {connect} from 'react-redux'
import {Translate, TranslateHTML} from '../Translation'
import {List, ListItem} from 'material-ui/List'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import {actionList} from './reducers'
import {actionList as actionListBasket} from '../Basket/reducers'
import PropTypes from 'prop-types'
import createClass from 'create-react-class'

var rootStyle = {float: 'left', minWidth: '200px', margin: '5px'}
var selectedStyle = Object.assign({}, rootStyle, {boxShadow: '#2CAC10 0px 1px 6px, #2CAC10 0px 1px 4px'})
const BasketList = createClass({
  propTypes: {
    basketList: PropTypes.object,
    basket: PropTypes.object,
    fetch: PropTypes.func,
    close: PropTypes.func,
    reassign: PropTypes.func
  },
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  componentWillMount() {
    this.props.fetch()
  },
  componentWillReceiveProps(nextProps) {
    if (
      (nextProps.basket.id !== this.props.basket.id)
      || (nextProps.basket.products.length !== this.props.basket.products.length)
      || (nextProps.basket.products.reduce((accum, cur) => accum + cur.transaction.quantity, 0) !== this.props.basket.products.reduce((accum, cur) => accum + cur.transaction.quantity, 0))
    ) {
      this.props.fetch()
    }
  },
  close(basketId) {
    return () => {
      this.props.close(basketId)
    }
  },
  select(basketId) {
    return () => {
      this.context.router.push(['/store', basketId].join('/'))
    }
  },
  assignTo(from) {
    let to = this.props.basket.id
    return () => {
      if (from !== to) {
        this.props.reassign(from, to, 'to')
      }
    }
  },
  assignFrom(to) {
    let from = this.props.basket.id
    return () => {
      if (from !== to) {
        this.props.reassign(from, to, 'from')
      }
    }
  },
  render() {
    return (
      <div>
        {this.props.basketList.data.map((el, idx) => {
          return (
            <Card style={this.props.basket.id === el.id ? selectedStyle : rootStyle} key={idx}>
              <CardActions style={{display: 'block', clear: 'both', overflow: 'hidden'}}>
                <b style={{float: 'left', padding: '3px 0 0 0'}}>{el.name}</b>
                <IconMenu
                  style={{float: 'right'}}
                  iconButtonElement={<IconButton style={{width: 'auto', height: 'auto', padding: '0px'}}><MoreVertIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                >
                  <MenuItem onTouchTap={this.select(el.id)} primaryText={<Translate id='Select' />} />
                  <MenuItem onTouchTap={this.assignTo(el.id)} primaryText={<Translate id='Assign to' />} />
                  <MenuItem onTouchTap={this.assignFrom(el.id)} primaryText={<Translate id='Assign from' />} />
                  <MenuItem onTouchTap={this.close(el.id)} primaryText={<Translate id='Close/Paid' />} />
                </IconMenu>
              </CardActions>
              <CardHeader
                subtitle={<span>{(Math.round(el.products.reduce((pv, cv) => {
                  return pv + (cv.price * cv.quantity)
                }, 0) * 100) / 100).toString()} <TranslateHTML id='_currency' /></span>}
                actAsExpander showExpandableButton
              />
              <CardText expandable>
                <List>
                  {el.products.map((el, idx) => {
                    return <ListItem
                      key={idx}
                      primaryText={el.name}
                      secondaryText={<span>{Math.round((el.price * el.quantity) * 100) / 100} <TranslateHTML id='_currency' /></span>}
                    />
                  })}
                </List>
              </CardText>
            </Card>
          )
        })}
      </div>
    )
  }
})

export default connect(
  (state) => ({basketList: state.basketList, basket: state.basket}),
  {
    fetch: (body) => ({type: actionList.FETCH, httpRequest: {
      method: 'GET',
      url: '/api/baskets',
      json: true
    }}),
    close: (basketId) => ({type: actionList.CLOSE, httpRequest: {
      method: 'DELETE',
      url: '/api/baskets',
      json: true,
      body: {basketId}
    }}),
    reassign: (from, to, direction) => ({type: actionListBasket.REASSIGN, httpRequest: {
      method: 'POST',
      url: '/api/baskets/reassign',
      json: true,
      body: {from, to}
    }, direction: direction})
  }
)(BasketList)
