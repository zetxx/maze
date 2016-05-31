import React from 'react'
import {connect} from 'react-redux'
import {setTitle} from '../Heading/actions'
import {Card, CardActions, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import {FormattedMessage} from 'react-intl'

const Config = React.createClass({
  propTypes: {
    setTitle: React.PropTypes.func
  },
  componentDidMount() {
    this.props.setTitle('Config')
  },
  handleChange(el) {
    return (event, index, value) => {
      var state = {}
      state[el] = value
      this.setState(state)
    }
  },
  render() {
    var globalLanguage = this.state && this.state.globalLanguage || 'en'
    return (
      <Card>
        <CardText>
          <SelectField floatingLabelText={<FormattedMessage id='Global language' />} style={{margin: '0 10px 10px 0'}} value={globalLanguage} ref='globalLanguage' onChange={this.handleChange('globalLanguage')}>
            <MenuItem value='en' primaryText={<FormattedMessage id='English' />} />
            <MenuItem value='bg' primaryText={<FormattedMessage id='Bulgarian' />} />
          </SelectField>
        </CardText>
        <CardActions>
          <FlatButton label={<FormattedMessage id='Cancel' />} />
          <FlatButton label={<FormattedMessage id='Save' />} />
        </CardActions>
      </Card>
    )
  }
})

export default connect(
  null,
  {setTitle}
)(Config)
