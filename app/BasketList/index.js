import React from 'react'
import {connect} from 'react-redux'
import Card from 'material-ui/Card/Card'
import CardHeader from 'material-ui/Card/CardHeader'
import CardText from 'material-ui/Card/CardText'
import Badge from 'material-ui/Badge'

var rootStyle = {float: 'left', minWidth: '200px', margin: '5px'}
const BasketList = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    selectState: React.PropTypes.bool,
    title: React.PropTypes.string
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
                title={<div title=''>
                  <Badge style={{padding: '3px 30px 0 0'}}
                    badgeContent={el.productList.length}
                    primary
                  >
                    {el.title}
                  </Badge>
                  {badgeAdd}
                </div>}
                subtitle={el.productList.reduce((pv, cv) => {
                  return pv + cv.price
                }, 0)}
                actAsExpander showExpandableButton
              />
              <CardText expandable>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </CardText>
            </Card>
          )
        })}
      </div>
    )
  }
})

export default connect(
  (state) => (state.basketList)
)(BasketList)
