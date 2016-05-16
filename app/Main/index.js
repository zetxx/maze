import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import PrefetchDialog from './PrefetchDialog.js'
import ErrorDialog from './ErrorDialog.js'
import MainMenu from '../MainMenu'

const Gate = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },
  propTypes: {
    children: React.PropTypes.object,
    location: React.PropTypes.object
  },
  getChildContext() {
    return {muiTheme: getMuiTheme()}
  },
  redirect(to) {
    if (!to.bubbles) {
      this.context.router.push(to)
    }
  },
  render() {
    return (
      <div>
        {this.props.children}
        <PrefetchDialog />
        <ErrorDialog />
        <MainMenu />
      </div>
    )
  }
})

export default Gate
