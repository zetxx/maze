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

import {actionList} from './reducers'

const ProductEdit = React.createClass({
  propTypes: {
    edit: React.PropTypes.func,
    cantEdit: React.PropTypes.func,
    cancelToggle: React.PropTypes.func,
    fetchProducts: React.PropTypes.func,
    filesForUpload: React.PropTypes.array,
    uploadedList: React.PropTypes.array,
    uploadRequestId: React.PropTypes.number,
    productEdit: React.PropTypes.object
  },
  componentWillReceiveProps(next) {
    if (this.props.productEdit.open && !next.productEdit.open && !next.productEdit.canceled) {
      next.fetchProducts()
    }
    if(next.uploadedList.length && next.uploadRequestId !== this.props.uploadRequestId) { // fire edit action after successfully upload
      var vals = getFieldValues(this.refs, ['name', 'category', 'supplier', 'description', 'barcode', 'price', 'quantityTypeId'])
      this.props.edit(Object.assign({}, vals.correct, {files: next.uploadedList}))
    }
  },
  edit() {
    var vals = getFieldValues(this.refs, ['name', 'category', 'supplier', 'description', 'barcode', 'price', 'quantityTypeId'])
    if (Object.keys(vals.incorrect).length === 0) {
      if(this.props.filesForUpload.length) {
        this.props.upload(this.props.filesForUpload)
      } else {
        this.props.edit(vals.correct)
      }
    } else {
      return this.props.cantEdit(vals.incorrect)
    }
  },
  renderFiles() {
    return (<div>
      <ul>
        {this.props.productEdit.item.files.map((file) => {
          console.log(file)
          return (<div>
            <img src={`/api/files/image/${file.id}/80x80`} alt={file.name} />
          </div>)
        })}
      </ul>
      <hr />
    </div>)
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
          errorText={this.props.productEdit.fieldError.name}
        />&nbsp;
        <TextField
          ref='price'
          value={this.props.productEdit.item.price}
          hintText={<Translate id='Price' />}
          floatingLabelText={<Translate id='Price' />}
          errorText={this.props.productEdit.fieldError.price}
        /><br />
        <TextField
          ref='description'
          value={this.props.productEdit.item.description || ''}
          hintText={<Translate id='Product description' />}
          floatingLabelText={<Translate id='Product description' />}
          errorText={this.props.productEdit.fieldError.description}
        />&nbsp;
        <TextField
          ref='barcode'
          value={this.props.productEdit.item.barcode || ''}
          hintText={<Translate id='Product Bar code' />}
          floatingLabelText={<Translate id='Product Bar code' />}
          errorText={this.props.productEdit.fieldError.barcode}
        /><br />
        <ProductCatDropDown ref='category' value={this.props.productEdit.item.category} />
        <SupplierDropDown ref='supplier' value={this.props.productEdit.item.supplier} />
        <QuantityType ref='quantityTypeId' value={this.props.productEdit.item.quantityTypeId} /><br/>
        <hr />
        {this.renderFiles()}
        <Upload />
      </Dialog>
    )
  }
})

export default connect(
  (state) => ({
    productEdit: state.productEdit,
    filesForUpload: state.uploadFiles.get('list').toJS(),
    uploadedList: state.uploadFiles.get('uploadedList').toJS(),
    uploadRequestId: state.uploadFiles.get('uploadRequestId')
  }),
  {
    edit(body) {
      return {type: actionList.EDIT, httpRequest: {
        method: 'PUT',
        url: '/api/products',
        json: true,
        body: body
      }}
    },
    cantEdit(problems) {
      return {type: actionList.EDIT_VALIDATION_PROBLEM, problems}
    },
    cancelToggle() {
      return {type: actionList.TOGGLE_EDIT, canceled: true}
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
)(ProductEdit)
