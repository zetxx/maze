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
import FileList from '../Files/List'

import {actionList} from './reducers'

const ProductEdit = React.createClass({
  propTypes: {
    edit: React.PropTypes.func,
    cantEdit: React.PropTypes.func,
    cancelToggle: React.PropTypes.func,
    fetchProducts: React.PropTypes.func,
    changeFieldsValue: React.PropTypes.func,
    filesForUpload: React.PropTypes.array,
    defaultFile: React.PropTypes.number,
    uploadedList: React.PropTypes.array,
    deletedFiles: React.PropTypes.array,
    uploadRequestId: React.PropTypes.number,
    productEdit: React.PropTypes.object
  },
  componentWillReceiveProps(next) {
    if (this.props.productEdit.open && !next.productEdit.open && !next.productEdit.canceled) {
      next.fetchProducts()
    }
    if (next.uploadedList.length && next.uploadRequestId !== this.props.uploadRequestId) { // fire edit action after successfully upload
      var vals = getFieldValues(this.refs, ['name', 'category', 'supplier', 'description', 'barcode', 'price', 'quantityTypeId'])
      this.props.edit(Object.assign({}, vals.correct, {files: next.uploadedList, filesDeleted: this.props.deletedFiles, defaultFile: this.props.defaultFile}), this.props.productEdit.item.id)
    }
  },
  edit() {
    var vals = getFieldValues(this.refs, ['name', 'category', 'supplier', 'description', 'barcode', 'price', 'quantityTypeId'])
    if (Object.keys(vals.incorrect).length === 0) {
      if (this.props.filesForUpload.length) {
        this.props.upload(this.props.filesForUpload)
      } else {
        this.props.edit(Object.assign({}, vals.correct, {filesDeleted: this.props.deletedFiles, defaultFile: this.props.defaultFile}), this.props.productEdit.item.id)
      }
    } else {
      return this.props.cantEdit(vals.incorrect)
    }
  },
  handleInputChange(input) {
    return (event) => {
      this.props.changeFieldsValue(input, event.target.value)
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
        onTouchTap={this.edit}
      />
    ]
    return (
      <Dialog actions={actions} title={<h3 style={{padding: '24px'}}><Translate id='Product edit' /></h3>} modal open={this.props.productEdit.open}>
        <TextField
          ref='name'
          value={this.props.productEdit.item.name}
          hintText={<Translate id='Product name' />}
          floatingLabelText={<Translate id='Product name' />}
          onChange={this.handleInputChange('name')}
          errorText={this.props.productEdit.fieldError.name}
        />&nbsp;
        <TextField
          ref='price'
          value={this.props.productEdit.item.price}
          hintText={<Translate id='Price' />}
          floatingLabelText={<Translate id='Price' />}
          onChange={this.handleInputChange('price')}
          errorText={this.props.productEdit.fieldError.price}
        /><br />
        <TextField
          ref='description'
          value={this.props.productEdit.item.description || ''}
          hintText={<Translate id='Product description' />}
          floatingLabelText={<Translate id='Product description' />}
          onChange={this.handleInputChange('description')}
          errorText={this.props.productEdit.fieldError.description}
        />&nbsp;
        <TextField
          ref='barcode'
          value={this.props.productEdit.item.barcode || ''}
          hintText={<Translate id='Product Bar code' />}
          floatingLabelText={<Translate id='Product Bar code' />}
          onChange={this.handleInputChange('barcode')}
          errorText={this.props.productEdit.fieldError.barcode}
        /><br />
        <ProductCatDropDown
          ref='category'
          onChange={this.handleInputChange('category')}
          value={this.props.productEdit.item.category}
        />
        <SupplierDropDown
          ref='supplier'
          onChange={this.handleInputChange('supplier')}
          value={this.props.productEdit.item.supplier}
        />
        <QuantityType
          ref='quantityTypeId'
          onChange={this.handleInputChange('quantityTypeId')}
          value={this.props.productEdit.item.quantityTypeId}
        /><br />
        <hr />

        <FileList />
        <Upload edit />
      </Dialog>
    )
  }
})

export default connect(
  (state) => {
    return {
      productEdit: state.productEdit,
      deletedFiles: state.configFileListSelection.deletedItems,
      defaultFile: state.configFileListSelection.isDefault,
      filesForUpload: state.uploadFilesEdit.get('list').toJS(),
      uploadedList: state.uploadFilesEdit.get('uploadedList').toJS(),
      uploadRequestId: state.uploadFilesEdit.get('uploadRequestId')
    }
  },
  {
    edit(body, productId) {
      return {type: actionList.EDIT,
        httpRequest: {
          method: 'POST',
          url: `/api/products/${productId}`,
          json: true,
          body: body
        }
      }
    },
    changeFieldsValue(field, value) {
      return {
        type: actionList.CHANGE_FIELDS_VALUE,
        field,
        value
      }
    },
    cantEdit(problems) {
      return {type: actionList.EDIT_VALIDATION_PROBLEM, problems}
    },
    cancelToggle() {
      return {type: actionList.TOGGLE_EDIT, canceled: true}
    },
    upload(filesData) {
      return {type: actionListUpload.EDIT_UPLOAD,
        httpRequest: {
          method: 'UPLOAD',
          url: '/api/upload',
          filesData
        }
      }
    },
    fetchProducts() {
      return {
        type: actionList.FETCH,
        httpRequest: {
          method: 'GET',
          url: '/api/products',
          json: true
        }
      }
    }
  }
)(ProductEdit)
