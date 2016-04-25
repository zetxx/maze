import React from 'react'
import {connect} from 'react-redux'
import Card from 'material-ui/Card/Card'
import AppBar from 'material-ui/AppBar/AppBar'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import {Table, TableHeaderColumn, TableRow, TableHeader, TableBody, TableRowColumn} from 'material-ui/Table'
import IconButton from 'material-ui/IconButton/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'

class ProductCat extends React.Component {
  componentDidMount() {
    this.props.fetch({
      method: 'GET',
      url: '/api/productCategory',
      json: true
    })
  }
  render() {
    return (
      <div>
        <Card>
          <AppBar
            title={<span>ProductCat</span>}
            iconElementRight={<FlatButton label='Add' />}
          />

          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Operations</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {this.props.productCategories.data && this.props.productCategories.data.map((el) => (
                <TableRow>
                  <TableRowColumn>1</TableRowColumn>
                  <TableRowColumn>
                    <IconButton><DeleteIcon /></IconButton>
                    <IconButton><EditIcon /></IconButton>
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    )
  }
}

ProductCat.propTypes = {
  fetch: React.PropTypes.func,
  productCategories: React.PropTypes.object
}

export default connect(
  (state) => ({productCategories: state.productCategories}),
  {
    fetch(httpRequest) {
      return {type: 'FETCH_PRODUCT_CATEGORIES', httpRequest: httpRequest}
    }
  }
)(ProductCat)
