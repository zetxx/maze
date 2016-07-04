import React from 'react'
import {connect} from 'react-redux'
import AppBar from 'material-ui/AppBar/AppBar'
import {Card, CardActions, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import {setTitle} from '../Heading/actions'
import {updateConfig, fetchSiteConfig} from '../Config/actions'
import {Translate} from '../Translation'
import Shop from './Shop'

const Config = React.createClass({
  propTypes: {
    siteConfig: React.PropTypes.object,
    updatedConfig: React.PropTypes.object,
    fetchSiteConfig: React.PropTypes.func,
    setTitle: React.PropTypes.func,
    updateConfig: React.PropTypes.func
  },
  getInitialState() {
    return {globalLanguage: this.props.siteConfig.globalLanguage}
  },
  componentDidMount() {
    this.props.setTitle('Config')
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.updatedConfig.data && nextProps.updatedConfig.data.indexOf('globalLanguage') >= 0 && this.props.updatedConfig !== nextProps.updatedConfig) {
      this.props.fetchSiteConfig()
    }
  },
  handleChange(el) {
    return (event, index, value) => {
      var state = {}
      state[el] = value
      this.setState(state)
    }
  },
  updateConfig() {
    this.props.updateConfig({
      globalLanguage: this.state.globalLanguage
    })
  },
  render() {
    return (
      <div>
        <Card>
          <AppBar
            title={<Translate id='Common config' />}
          />
          <CardText>
            <SelectField floatingLabelText={<Translate id='Global language' />} style={{margin: '0 10px 10px 0'}} value={this.state.globalLanguage} ref='globalLanguage' onChange={this.handleChange('globalLanguage')}>
              <MenuItem value='en' primaryText={<Translate id='English' />} />
              <MenuItem value='bg' primaryText={<Translate id='Bulgarian' />} />
            </SelectField>
          </CardText>
          <CardActions>
            <FlatButton label={<Translate id='Cancel' />} />
            <FlatButton onTouchTap={this.updateConfig} label={<Translate id='Save' />} />
          </CardActions>
        </Card><br />
        <Shop />
      </div>
    )
  }
})

export default connect(
  (state) => ({siteConfig: state.siteConfig, updatedConfig: state.updatedConfig}),
  {setTitle, updateConfig, fetchSiteConfig}
)(Config)
