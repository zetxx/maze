const Joi = require('joi')
const path = require('path')
const fs = require('fs')
const preHandlers = require('../../preHandlers')
const product = require('./model.js')
const repository = require('../Repository/model')
const files = require('../Files/model')
const quantityType = require('../QuantityType/model')
const productCategories = require('../ProductCat/model')
const filesModel = require('../Files/model')
const sequelize = require('../../../config/db')
const config = require('../../../config/server')
const baseDir = path.dirname(require.main.filename)
const filesDirectory = {
  uploadDir: path.join.apply(null, [baseDir].concat(config.upload.uploadDir)),
  storeDir: path.join.apply(null, [baseDir].concat(config.upload.storeDir))
}

product.hasOne(repository, {foreignKey : 'productId'})
product.belongsTo(quantityType, {foreignKey : 'quantityTypeId'})
product.belongsTo(productCategories, {foreignKey : 'category'})
repository.hasOne(product)
product.hasMany(files, {foreignKey : 'itemId'})

module.exports = function(registrar) {
  registrar({
    method: 'POST',
    path: '/api/products',
    config: {
      pre: preHandlers,
      handler: function (req, resp) {
        var files = req.payload.files || [];
        sequelize.transaction((t) => {
          return product
            .create(req.payload, {transaction: t})
            .then((r) => {
              var productId = r.id
              if (files.length) {
                return files.map((file, idx) => ({
                  itemId: productId,
                  itemType: 'product',
                  isDefault: !idx,
                  contentType: file['content-type'],
                  name: file.originFileName,
                  fileName: file.fileName
                }))
                .reduce((p, file) => {
                  return p.then(() => {
                    var sourceFileName = path.join(filesDirectory.uploadDir, file.fileName)
                    delete file.fileName
                    return filesModel
                      .create(file, {transaction: t})
                      .then((ifr) => (new Promise((resolve, reject) => {
                        var destinationFileName = path.join(filesDirectory.storeDir, productId.toString(), ifr.id.toString())
                        var dir = path.join(filesDirectory.storeDir, productId.toString());
                        if (!fs.existsSync(dir)){
                          fs.mkdirSync(dir)
                        }
                        fs
                          .createReadStream(sourceFileName)
                          .on('end', () => {
                            try {
                              fs.unlinkSync(sourceFileName)
                            } catch (e) {}
                            resolve();
                          })
                          .on('error', reject)
                          .pipe(fs.createWriteStream(destinationFileName))
                      })))
                  });
                }, Promise.resolve())
                .then(() => r)
              }
              return r
            })
        })
        .then(resp)
        .catch((e) => {
          console.error(e)
          resp(e)
        })
      },
      description: 'Add Product',
      notes: 'Adds a product category',
      tags: ['api', 'add', 'product'],
      validate: {
        payload: {
          name: Joi.string().required().description('Product name'),
          barcode: Joi.number().min(3).description('Product Bar code'),
          description: Joi.string().required().description('Product description'),
          category: Joi.number().min(1).required().description('Product category'),
          supplier: Joi.number().min(1).required().description('Supplier'),
          files: Joi.array().items(Joi.object({
            'content-type': Joi.string(),
            'fileName': Joi.string(),
            'originFileName': Joi.string()
          })),
          quantityTypeId: Joi.number().min(1).required().description('one of: piece or weight'),
          price: Joi.string().regex(/[\d]+\.[\d]{2,2}/).required().description('Product Price')
        }
      }
    }
  })

  registrar({
    method: 'GET',
    path: '/api/products',
    config: {
      pre: preHandlers,
      handler: function (req, resp) {
        product.findAll({
          attributes: ['id', 'name', 'price'],
          include: [{
            attributes: ['quantity'],
            model: repository
          }, {
            model: quantityType
          }, {
            model: productCategories
          }, {
            model: files,
            required: false,
            where: {itemType: 'product'}
          }],
          group: 'products.id'
        })
          .then(resp)
          .catch((e) => {
            console.error(e)
            resp(e)
          })
      },
      description: 'List products',
      notes: 'List products',
      tags: ['api', 'get', 'product']
    }
  })

  registrar({
    method: 'GET',
    path: '/api/config/products',
    config: {
      pre: preHandlers,
      handler: function (req, resp) {
        product.findAll({
          attributes: ['id', 'name', 'price'],
          include: [{
            attributes: ['quantity'],
            model: repository
          }, {
            model: quantityType
          }, {
            model: productCategories
          }, {
            model: files,
            required: false,
            where: {itemType: 'product'}
          }],
          group: 'products.id'
        })
          .then(resp)
          .catch((e) => {
            console.error(e)
            resp(e)
          })
      },
      description: 'List products',
      notes: 'List products',
      tags: ['api', 'get', 'products']
    }
  })

  registrar({
    method: 'GET',
    path: '/api/config/products/{productId}',
    config: {
      pre: preHandlers,
      handler: function (req, resp) {
        product.find({
          attributes: ['id', 'name', 'price', 'supplier', 'category', 'quantityTypeId'],
          where: {id: req.params.productId},
          include: [{
            attributes: ['id', 'name', 'contentType'],
            model: files,
            required: false,
            where: {itemType: 'product'}
          }]
        })
          .then(resp)
          .catch((e) => {
            console.error(e)
            resp(e)
          })
      },
      description: 'List product',
      notes: 'List product',
      tags: ['api', 'get', 'product'],
      validate: {
        params: {
          productId: Joi.number().min(1).required().description('Product Id')
        }
      }
    }
  })
}
