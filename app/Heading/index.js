import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Avatar from 'material-ui/Avatar'
import {Translate} from '../Translation'
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
        title={<Translate id={this.props.title} />}
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
            <MenuItem primaryText={<Translate id='Store' />} onTouchTap={this.navTo('/store')} />
            <MenuItem primaryText={<Translate id='Manage Products' />} onTouchTap={this.navTo('/manage/products')} />
            <MenuItem primaryText={<Translate id='Config' />} onTouchTap={this.navTo('/manage/config')} />
            <MenuItem primaryText={<Translate id='Users' />} onTouchTap={this.navTo('/manage/users')} />
          </IconMenu>
        }
      />
    )
  }
})

export default Heading
