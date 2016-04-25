import React from 'react'
import AutoComplete from 'material-ui/auto-complete'

export default class Search extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      dataSource: []
    }
  }

  handleUpdateInput = (t) => {
    if (t.length > 4) {
      this.setState({
        dataSource: [t, t + t, t + t + t]
      })
    }
  };

  render() {
    return (
      <div style={{padding: '0 10px'}}>
        <AutoComplete
          hintText='p: - product id'
          fullWidth={true}
          floatingLabelText='Search'
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdateInput}
        />
      </div>
    )
  }
}
