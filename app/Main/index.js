import React from 'react'
import {Tab, Tabs} from 'material-ui/Tabs'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import PrefetchDialog from './PrefetchDialog.js'

export default class Gate extends React.Component {
  constructor(props) {
    super(props)
    this.redirect = this.redirect.bind(this)
  }
  redirect(to) {
    this.context.router.push(to)
  }
  getChildContext() {
    return {muiTheme: getMuiTheme()}
  }
  render() {
    return (
      <div>
        <Tabs value={this.props.location.pathname} onChange={this.redirect}>
          <Tab label='Sell' value='/sell'>{this.props.children && this.props.location.pathname === '/sell' ? this.props.children : ''}</Tab>
          <Tab label='Maze' value='/manage'>{this.props.children && this.props.location.pathname === '/manage' ? this.props.children : ''}</Tab>
        </Tabs>
        <PrefetchDialog />
      </div>
    )
  }
}

Gate.contextTypes = {
  router: React.PropTypes.object
}
Gate.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
}

Gate.propTypes = {
  children: React.PropTypes.object,
  location: React.PropTypes.object
}
