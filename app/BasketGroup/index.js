import React from 'react'
import Card from 'material-ui/Card/Card'
import CardHeader from 'material-ui/Card/CardHeader'
import CardText from 'material-ui/Card/CardText'
import Badge from 'material-ui/Badge'

export default class Basket extends React.Component {
  render() {
    var rootStyle = {float: 'left', minWidth: '200px', margin: '5px'}
    var badgeAdd;
    if (this.props.selectState) {
      badgeAdd = <Badge style={{padding: '3px 22px 0 0'}}
        badgeContent='+'
        secondary>&nbsp;
      </Badge>
    }
    return (
      <Card style={rootStyle}>
        <CardHeader
          title={<div title=''>
            <Badge style={{padding: '3px 30px 0 0'}}
              badgeContent={this.props.data.productList.length}
              primary
            >
              {this.props.data.title}
            </Badge>
            {badgeAdd}
          </div>}
          subtitle={this.props.data.productList.reduce((pv, cv) => {
            return pv + cv.price
          }, 0)}
          actAsExpander showExpandableButton
        />
        <CardText expandable>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </CardText>
      </Card>
    )
  }
}

Basket.propTypes = {
  data: React.PropTypes.object,
  selectState: React.PropTypes.bool,
  title: React.PropTypes.string
}
