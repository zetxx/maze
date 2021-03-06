import React from 'react'
import {connect} from 'react-redux'
import Card from 'material-ui/Card/Card'
import AppBar from 'material-ui/AppBar/AppBar'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import {Table, TableHeaderColumn, TableRow, TableHeader, TableBody, TableRowColumn} from 'material-ui/Table'
import IconButton from 'material-ui/IconButton/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import {Translate} from '../../../Translation'
import Add from './Add'
import PropTypes from 'prop-types'

class Shop extends React.Component {
  componentDidMount() {
    this.props.fetch()
  }
  render() {
    return (
      <div>
        <Card>
          <AppBar
            title={<Translate id='Shops' />}
            iconElementRight={<FlatButton label={<Translate id='Add' />} onTouchTap={this.props.add} />}
          />

          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn><Translate id='Name' /></TableHeaderColumn>
                <TableHeaderColumn style={{width: '110px'}}><Translate id='Operations' /></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.shops.data && this.props.shops.data.map((el) => (
                <TableRow key={el.id}>
                  <TableRowColumn>{el.name}</TableRowColumn>
                  <TableRowColumn style={{width: '110px'}}>
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

Shop.propTypes = {
  fetch: PropTypes.func,
  add: PropTypes.func,
  shops: PropTypes.object
}

export default connect(
  (state) => ({shops: state.shops}),
  {
    fetch() {
      return {
        type: 'FETCH_SHOPS', httpRequest: {
          method: 'GET',
          url: '/api/shops',
          json: true
        }
      }
    },
    add() {
      return {type: 'TOGGLE_SHOP_ADD'}
    }
  }
)(Shop)
