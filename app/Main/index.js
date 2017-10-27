import React from 'react'
import {connect} from 'react-redux'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import PrefetchDialog from './PrefetchDialog.js'
import ErrorDialog from './ErrorDialog.js'
import heading from '../Heading'
import {fetchSiteConfig} from '../Manage/Config/actions'
import PropTypes from 'prop-types'

const Heading = connect(
  (state) => (state.heading)
)(heading)

const Gate = React.createClass({
  contextTypes: {
    router: PropTypes.object
  },
  childContextTypes: {
    muiTheme: PropTypes.object.isRequired
  },
  propTypes: {
    fetchSiteConfig: PropTypes.func,
    children: PropTypes.object,
    siteConfig: PropTypes.object,
    location: PropTypes.object
  },
  componentWillMount() {
    this.props.fetchSiteConfig()
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
    if (this.props.siteConfig && this.props.siteConfig.globalLanguage) {
      return (
        <div>
          <Heading />
          {this.props.children}
          <PrefetchDialog />
          <ErrorDialog />
        </div>
      )
    }
    return false
  }
})

export default connect(
  (state) => ({siteConfig: state.siteConfig}),
  {fetchSiteConfig}
)(Gate)
