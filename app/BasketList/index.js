import React from 'react'
import {connect} from 'react-redux'
import Card from 'material-ui/Card/Card'
import CardHeader from 'material-ui/Card/CardHeader'
import CardText from 'material-ui/Card/CardText'
import Badge from 'material-ui/Badge'
import {List, ListItem} from 'material-ui/List'
import AssignIcon from 'material-ui/svg-icons/action/add-shopping-cart'
import FlatButton from 'material-ui/FlatButton'

var rootStyle = {float: 'left', minWidth: '200px', margin: '5px'}
var selectedStyle = Object.assign({}, rootStyle, {boxShadow: '#2CAC10 0px 1px 6px, #2CAC10 0px 1px 4px'})
const BasketList = React.createClass({
  propTypes: {
    basketList: React.PropTypes.object,
    basket: React.PropTypes.object,
    fetch: React.PropTypes.func
  },
  componentWillMount() {
    this.props.fetch()
  },
  componentWillReceiveProps(nextProps) {
    if (typeof (this.props.basket.id) === 'undefined' && nextProps.basket.id !== this.props.basket.id || (nextProps.basket.products.length !== this.props.basket.products.length)) {
      this.props.fetch()
    }
  },
  render() {
    return (
      <div>
        {this.props.basketList.data.map((el, idx) => {
          return (
            <Card style={this.props.basket.id === el.id ? selectedStyle : rootStyle} key={idx}>
              <CardHeader
                style={{paddingBottom: '0px'}}
                title={<div title=''>
                  <Badge style={{padding: '7px 30px 0 0'}}
                    badgeContent={el.products.length}
                    primary
                  >
                    <b>{el.name}</b>
                  </Badge>
                  <FlatButton
                    icon={<AssignIcon />}
                  />
                </div>}
              />
              <CardHeader
                style={{paddingTop: '0px'}}
                subtitle={(Math.round(el.products.reduce((pv, cv) => {
                  return pv + (cv.price * cv.quantity)
                }, 0) * 100) / 100).toString() + ' lv.'}
                actAsExpander showExpandableButton
              />
              <CardText expandable>
                <List>
                  {el.products.map((el, idx) => {
                    return <ListItem
                      key={idx}
                      primaryText={el.name}
                      secondaryText={Math.round((el.price * el.quantity) * 100) / 100}
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
    fetch: (body) => ({type: 'FETCH_BASKETS', httpRequest: {
      method: 'GET',
      url: '/api/baskets',
      json: true
    }})
  }
)(BasketList)
