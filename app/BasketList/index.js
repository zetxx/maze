import React from 'react'
import {connect} from 'react-redux'
import {List, ListItem} from 'material-ui/List'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'

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
              <CardActions style={{display: 'block', clear: 'both', overflow: 'hidden'}}>
                <b style={{float: 'left', padding: '3px 0 0 0'}}>{el.name}</b>
                <IconMenu
                  style={{float: 'right'}}
                  iconButtonElement={<IconButton style={{width: 'auto', height: 'auto', padding: '0px'}}><MoreVertIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                >
                  <MenuItem primaryText='Refresh' />
                  <MenuItem primaryText='Send feedback' />
                </IconMenu>
              </CardActions>
              <CardHeader
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