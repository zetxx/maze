import React from 'react'
import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
import Card from 'material-ui/Card/Card'
import Add from './Add'
import AppBar from 'material-ui/AppBar/AppBar'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import {Table, TableHeaderColumn, TableRow, TableHeader, TableBody, TableRowColumn} from 'material-ui/Table'
import IconButton from 'material-ui/IconButton/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'

class ProductCat extends React.Component {
  componentDidMount() {
    this.props.fetch()
  }
  render() {
    return (
      <div>
        <Card>
          <AppBar
            title={<FormattedMessage id='Product Category' />}
            iconElementRight={<FlatButton label={<FormattedMessage id='Add' />} onTouchTap={this.props.add} />}
          />

          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn><FormattedMessage id='Name' /></TableHeaderColumn>
                <TableHeaderColumn style={{width: '100px'}}><FormattedMessage id='Operations' /></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.productCategories.data && this.props.productCategories.data.map((el) => (
                <TableRow key={el.id}>
                  <TableRowColumn>{el.name}</TableRowColumn>
                  <TableRowColumn style={{width: '100px'}}>
                    <IconButton><DeleteIcon /></IconButton>
                    <IconButton><EditIcon /></IconButton>
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <Add />
      </div>
    )
  }
}

ProductCat.propTypes = {
  fetch: React.PropTypes.func,
  add: React.PropTypes.func,
  productCategories: React.PropTypes.object
}

export default connect(
  (state) => ({productCategories: state.productCategories}),
  {
    fetch() {
      return {
        type: 'FETCH_PRODUCT_CATEGORIES', httpRequest: {
          method: 'GET',
          url: '/api/productCategory',
          json: true
        }
      }
    },
    add() {
      return {type: 'TOGGLE_PRODUCT_CAT_ADD'}
    }
  }
)(ProductCat)
