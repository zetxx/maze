import React from 'react'
import {connect} from 'react-redux'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

const MainMenu = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  propTypes: {
    open: React.PropTypes.bool,
    toggle: React.PropTypes.func
  },
  navTo(path) {
    if (!path.bubbles) {
      return () => {
        this.props.toggle()
        this.context.router.push(path)
      }
    }
  },
  render() {
    return (
      <Drawer width={200} openSecondary open={this.props.open} docked={false}>
        <MenuItem onTouchTap={this.props.toggle}>CLOSE</MenuItem>
        <MenuItem onTouchTap={this.navTo('/sell')}>Sell</MenuItem>
        <MenuItem onTouchTap={this.navTo('/manage')}>Manage</MenuItem>
      </Drawer>
    )
  }
})

export default connect(
  (state) => (state.mainMenu),
  {
    toggle: () => ({type: 'MAIN_MENU_TOGGLE'})
  }
)(MainMenu)
