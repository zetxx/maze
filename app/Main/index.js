import React from 'react'
import {Tab, Tabs} from 'material-ui/Tabs'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import PrefetchDialog from './PrefetchDialog.js'
import ErrorDialog from './ErrorDialog.js'

export default class Gate extends React.Component {
  getChildContext() {
    return {muiTheme: getMuiTheme()}
  }
  render() {
    return (
      <div>
        <Tabs value={this.props.location.pathname} onChange={this.redirect}>
          <Tab label='Sell' value='/sell'><br />{this.props.children && this.props.location.pathname === '/sell' ? this.props.children : ''}</Tab>
          <Tab label='Maze' value='/manage'><br />{this.props.children && this.props.location.pathname === '/manage' ? this.props.children : ''}</Tab>
        </Tabs>
        <PrefetchDialog />
        <ErrorDialog />
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
