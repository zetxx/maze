import React from 'react'
import {connect} from 'react-redux'
import {IntlProvider, addLocaleData} from 'react-intl'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import PrefetchDialog from './PrefetchDialog.js'
import ErrorDialog from './ErrorDialog.js'
import heading from '../Heading'
import Languages from '../../config/languages'
import {fetchSiteConfig} from '../Config/actions'
import bg from 'react-intl/locale-data/bg'
import en from 'react-intl/locale-data/en'
addLocaleData([...en, ...bg])

const Heading = connect(
  (state) => (state.heading)
)(heading)

const Gate = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },
  propTypes: {
    fetchSiteConfig: React.PropTypes.func,
    children: React.PropTypes.object,
    siteConfig: React.PropTypes.object,
    location: React.PropTypes.object
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
        <IntlProvider locale={this.props.siteConfig.globalLanguage} messages={Languages[this.props.siteConfig.globalLanguage]}>
          <div>
            <Heading />
            {this.props.children}
            <PrefetchDialog />
            <ErrorDialog />
          </div>
        </IntlProvider>
      )
    }
    return false
  }
})

export default connect(
  (state) => ({siteConfig: state.siteConfig}),
  {fetchSiteConfig}
)(Gate)
