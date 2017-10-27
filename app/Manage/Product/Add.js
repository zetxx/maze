import React from 'react'
import {connect} from 'react-redux'
import {Translate} from '../../Translation'
import Dialog from 'material-ui/Dialog/Dialog'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import TextField from 'material-ui/TextField/TextField'
import ProductCatDropDown from './dropDown'
import QuantityType from '../QuantityType/dropDown'
import SupplierDropDown from '../Supplier/dropDown'
import {getFieldValues} from '../../Helpers.js'
import Upload from '../../Upload'
import {actionList as actionListUpload} from '../../Upload/reducers'
import PropTypes from 'prop-types'

import {actionList} from './reducers'

const ProductAdd = React.createClass({
  propTypes: {
    add: PropTypes.func,
    cantAdd: PropTypes.func,
    cancelToggle: PropTypes.func,
    fetchProducts: PropTypes.func,
    filesForUpload: PropTypes.array,
    uploadedList: PropTypes.array,
    uploadRequestId: PropTypes.number,
    productAdd: PropTypes.object
  },
  componentWillReceiveProps(next) {
    if (this.props.productAdd.open && !next.productAdd.open && !next.productAdd.canceled) {
      next.fetchProducts()
    }
    if(next.uploadedList.length && next.uploadRequestId !== this.props.uploadRequestId) { // fire add action after successfully upload
      var vals = getFieldValues(this.refs, ['name', 'category', 'supplier', 'description', 'barcode', 'price', 'quantityTypeId'])
      this.props.add(Object.assign({}, vals.correct, {files: next.uploadedList}))
    }
  },
  add() {
    var vals = getFieldValues(this.refs, ['name', 'category', 'supplier', 'description', 'barcode', 'price', 'quantityTypeId'])
    if (Object.keys(vals.incorrect).length === 0) {
      if(this.props.filesForUpload.length) {
        this.props.upload(this.props.filesForUpload)
      } else {
        this.props.add(vals.correct)
      }
    } else {
      return this.props.cantAdd(vals.incorrect)
    }
  },
  render() {
    const actions = [
      <FlatButton
        label={<Translate id='Cancel' />}
        secondary
        onTouchTap={this.props.cancelToggle}
      />,
      <FlatButton
        label={<Translate id='Submit' />}
        primary
        onTouchTap={this.add}
      />
    ]

    return (
      <Dialog actions={actions} title={<h3 style={{padding: '24px'}}><Translate id='Product add' /></h3>} modal open={this.props.productAdd.open}>
        <TextField
          ref='name'
          hintText={<Translate id='Product name' />}
          floatingLabelText={<Translate id='Product name' />}
          errorText={this.props.productAdd.fieldError.name}
        />
        <TextField
          ref='price'
          hintText={<Translate id='Price' />}
          floatingLabelText={<Translate id='Price' />}
          errorText={this.props.productAdd.fieldError.price}
        /><br />
        <TextField
          ref='description'
          hintText={<Translate id='Product description' />}
          floatingLabelText={<Translate id='Product description' />}
          errorText={this.props.productAdd.fieldError.description}
        />
        <TextField
          ref='barcode'
          hintText={<Translate id='Product Bar code' />}
          floatingLabelText={<Translate id='Product Bar code' />}
          errorText={this.props.productAdd.fieldError.barcode}
        />
        <ProductCatDropDown ref='category' value={1} />
        <SupplierDropDown ref='supplier' value={1} />
        <QuantityType ref='quantityTypeId' value={1} /><br/>
        <hr />
        <Upload />
      </Dialog>
    )
  }
})

export default connect(
  (state) => ({
    productAdd: state.productAdd,
    filesForUpload: state.uploadFiles.get('list').toJS(),
    uploadedList: state.uploadFiles.get('uploadedList').toJS(),
    uploadRequestId: state.uploadFiles.get('uploadRequestId')
  }),
  {
    add(body) {
      return {type: actionList.ADD, httpRequest: {
        method: 'POST',
        url: '/api/products',
        json: true,
        body: body
      }}
    },
    cantAdd(problems) {
      return {type: actionList.ADD_VALIDATION_PROBLEM, problems}
    },
    cancelToggle() {
      return {type: actionList.TOGGLE_ADD, canceled: true}
    },
    upload(filesData) {
      return {type: actionListUpload.UPLOAD, httpRequest: {
        method: 'UPLOAD',
        url: '/api/upload',
        filesData
      }}
    },
    fetchProducts() {
      return {
        type: actionList.FETCH, httpRequest: {
          method: 'GET',
          url: '/api/products',
          json: true
        }
      }
    }
  }
)(ProductAdd)
