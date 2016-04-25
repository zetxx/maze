import React from 'react'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog/Dialog'

class PrefetchDialog extends React.Component {
  render() {
    return (
      <Dialog title='Action ordered!' modal open={this.props.prefetchDialog.open}>
        Please wait for a while, fetching data
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
