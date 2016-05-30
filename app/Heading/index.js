import React from 'react'
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
    title: React.PropTypes.string
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
        title={<FormattedMessage id={this.props.title} />}
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
            <MenuItem primaryText={<FormattedMessage id='Manage Producst' />} onTouchTap={this.navTo('/manage/products')} />
            <MenuItem primaryText={<FormattedMessage id='Config' />} onTouchTap={this.navTo('/manage/config')} />
            <MenuItem primaryText={<FormattedMessage id='Users' />} onTouchTap={this.navTo('/manage/users')} />
          </IconMenu>
        }
      />
    )
  }
})

export default Heading
