import React from 'react'
import {connect} from 'react-redux'
import Card from 'material-ui/Card/Card'
import Add from './Add'
import AppBar from 'material-ui/AppBar/AppBar'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import {Table, TableHeaderColumn, TableRow, TableHeader, TableBody, TableRowColumn} from 'material-ui/Table'
import IconButton from 'material-ui/IconButton/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import {Translate} from '../../Translation'
import {actionList} from './reducers.js'

class ProductCat extends React.Component {
  componentDidMount() {
    this.props.fetch()
  }
  render() {
    return (
      <div>
        <Card>
          <AppBar
            title={<Translate id='Product Category' />}
            iconElementRight={<FlatButton label={<Translate id='Add' />} onTouchTap={this.props.add} />}
          />

          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn><Translate id='Name' /></TableHeaderColumn>
                <TableHeaderColumn style={{width: '100px'}}><Translate id='Operations' /></TableHeaderColumn>
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
        type: actionList.FETCH, httpRequest: {
          method: 'GET',
          url: '/api/productCategory',
          json: true
        }
      }
    },
    add() {
      return {type: actionList.TOGGLE_ADD}
    }
  }
)(ProductCat)
