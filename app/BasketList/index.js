import React from 'react'
import {connect} from 'react-redux'
import Card from 'material-ui/Card/Card'
import CardHeader from 'material-ui/Card/CardHeader'
import CardText from 'material-ui/Card/CardText'
import Badge from 'material-ui/Badge'
import {List, ListItem} from 'material-ui/List'
import HardwareVideogameAsset from 'material-ui/svg-icons/hardware/videogame-asset'
import {red500, yellow500, blue500} from 'material-ui/styles/colors'

var rootStyle = {float: 'left', minWidth: '200px', margin: '5px'}
const BasketList = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    fetch: React.PropTypes.func,
    selectState: React.PropTypes.bool,
    title: React.PropTypes.string
  },
  componentWillMount() {
    this.props.fetch()
  },
  render() {
    var badgeAdd

    if (this.props.selectState) {
      badgeAdd = <Badge style={{padding: '3px 22px 0 0'}}
        badgeContent='+'
        secondary>&nbsp;
      </Badge>
    }

    return (
      <div>
        {this.props.data.map((el, idx) => {
          return (
            <Card style={rootStyle} key={idx}>
              <CardHeader
                style={{paddingBottom: '0'}}
                title={<div title=''>
                  <Badge style={{padding: '7px 30px 0 0'}}
                    badgeContent={el.products.length}
                    primary
                  >
                    <b>{el.name}</b>
                  </Badge>
                  <HardwareVideogameAsset color={blue500} />
                  {badgeAdd}
                </div>}
              />
              <CardHeader
                style={{paddingTop: '0'}}
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
  (state) => (state.basketList),
  {
    fetch: (body) => ({type: 'FETCH_BASKETS', httpRequest: {
      method: 'GET',
      url: '/api/baskets',
      json: true
    }})
  }
)(BasketList)
