import React from 'react'
import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Avatar from 'material-ui/Avatar'
import FileFolder from 'material-ui/svg-icons/action/settings'
import {white500, blueGrey500} from 'material-ui/styles/colors'

const Heading = React.createClass({
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
        this.context.router.push(path)
      }
    }
  },
  render() {
    return (
      <AppBar
        style={{marginBottom: '10px'}}
        title='--------------'
        showMenuIconButton={false}
        iconElementRight={
          <IconMenu
            iconButtonElement={
              <Avatar
                icon={<FileFolder />}
                color={white500}
                backgroundColor={blueGrey500}
                size={40}
                style={{marginTop: '5px'}}
              />
            }
            targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem primaryText={<FormattedMessage id='Store' />} onTouchTap={this.navTo('/store')} />
            <MenuItem primaryText={<FormattedMessage id='Manage Producst' />} onTouchTap={this.navTo('/manage/product')} />
            <MenuItem primaryText={<FormattedMessage id='Manage Config' />} />
            <MenuItem primaryText={<FormattedMessage id='Manage Users' />} />
          </IconMenu>
        }
      />
    )
  }
})

export default connect(
)(Heading)

