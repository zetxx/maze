import React from 'react'
import Card from 'material-ui/Card/Card'
import CardHeader from 'material-ui/Card/CardHeader'
import {connect} from 'react-redux'

const SearchResults = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    open: React.PropTypes.bool
  },
  render() {
    if (!this.props.open) {
      return false
    }

    return (
      <div style={{position: 'absolute', zIndex: '1', width: '600px', cursor: 'pointer'}}>
        {this.props.data.map((data, idx) => {
          return (
            <Card key={idx}>
              <CardHeader
                title={<span>{data.title}: <b>{data.quantity * data.price} lv.</b></span>}
                subtitle={`${data.quantity} * ${data.price}`}
              />
            </Card>
          )
        })}
      </div>
    )
  }
})


export default connect(
  (state) => (state.sellSearch)
)(SearchResults)
