import React from 'react'
import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
import Dialog from 'material-ui/Dialog/Dialog'

class PrefetchDialog extends React.Component {
  render() {
    return (
      <Dialog title={<h3 style={{padding: '24px'}}><FormattedMessage id='Action ordered!' /></h3>} modal open={this.props.prefetchDialog.open}>
        <FormattedMessage id='pwfwfd' />
      </Dialog>
    )
  }
}

PrefetchDialog.propTypes = {
  prefetchDialog: React.PropTypes.object
}

export default connect(
  (state) => ({prefetchDialog: state.prefetchDialog})
)(PrefetchDialog)
