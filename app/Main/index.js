import React from 'react'
import Tabs from 'material-ui/lib/tabs/tabs'
import Tab from 'material-ui/lib/tabs/tab'

export default class Gate extends React.Component {
  constructor(props) {
    super(props)
    this.redirect = this.redirect.bind(this)
  }
  redirect(to) {
    this.context.router.push(to)
  }
  render() {
    return (
      <Tabs value={this.props.location.pathname} onChange={this.redirect}>
        <Tab label='Sell' value='/sell'>{this.props.children && this.props.location.pathname === '/sell' ? this.props.children : ''}</Tab>
        <Tab label='Maze' value='/maze'>{this.props.children && this.props.location.pathname === '/maze' ? this.props.children : ''}</Tab>
      </Tabs>
    )
  }
}

Gate.contextTypes = {
  router: React.PropTypes.object
}

Gate.propTypes = {
  children: React.PropTypes.object,
  location: React.PropTypes.object
}
