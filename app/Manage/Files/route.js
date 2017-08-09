const Joi = require('joi')
const path = require('path')
const fs = require('fs')
const preHandlers = require('../../preHandlers')
const files = require('./model.js')
const sequelize = require('../../../config/db')
const config = require('../../../config/server')
const Boom = require('boom')
const jimp = require('jimp')
const baseDir = path.dirname(require.main.filename)
const filesDirectory = {
  uploadDir: path.join.apply(null, [baseDir].concat(config.upload.uploadDir)),
  storeDir: path.join.apply(null, [baseDir].concat(config.upload.storeDir))
}

module.exports = function(registrar) {
  registrar({
    method: 'GET',
    path: '/api/files/image/{fileId}/{width}x{height}',
    config: {
      pre: preHandlers,
      handler: function (req, resp) {
        files.find({where: {id: req.params.fileId}})
        .then((r) => {
          if(!r) {
            throw Boom.notFound('missing resource');
          }
          var originFileName = path.join(filesDirectory.storeDir, r.itemId.toString(), r.id.toString())
          var fileName = path.join(
            filesDirectory.storeDir,
            r.itemId.toString(),
            [r.id.toString(), '_', req.params.width.toString(), 'x', req.params.height.toString()].join('')
          )
          return new Promise((resolve, reject) => {
            fs.stat(fileName, (err, stats) => {
              if (err) {
                if (err.errno !== -2) {
                  return reject(err)
                }
                jimp
                  .read(originFileName)
                  .then((img) => {
                    img.resize(req.params.width, req.params.height)
                      .quality(90)
                      .getBuffer(img.getMIME(), (err, buffer) => {
                        fs.open(fileName, 'w', (err, fd) => {
                          if (err) {
                            return reject(err)
                          }
                          fs.write(fd, buffer, (err) => {
                            if (err) {
                              return reject(err)
                            }
                            resolve({contentType: r.contentType, fileName})
                          })
                        })
                      })
                  })
                  .catch(reject)
              } else {
                resolve({contentType: r.contentType, fileName})
              }
            })
          })
        })
        .then((f) => {
          resp(fs.createReadStream(f.fileName))
          .type(f.contentType)
        })
        .catch((e) => {
          console.error(e)
          resp(e)
        })
      },
      description: 'Get image',
      notes: 'Get image',
      tags: ['api', 'image', 'get'],
      validate: {
        params: {
          fileId: Joi.number().min(1).required().description('File Id'),
          width: Joi.number().min(1).required().description('width'),
          height: Joi.number().min(1).required().description('height')
        }
      }
    }
  })

  registrar({
    method: 'GET',
    path: '/api/files/image/{fileId}',
    config: {
      pre: preHandlers,
      handler: function (req, resp) {
        files.find({where: {id: req.params.fileId}})
        .then((r) => {
          if(!r) {
            throw Boom.notFound('missing resource');
          }
          var fileName = path.join(filesDirectory.storeDir, r.itemId.toString(), r.id.toString())
          resp(fs.createReadStream(fileName))
          .type(r.contentType)
        })
        .catch((e) => {
          console.error(e)
          resp(e)
        })
      },
      description: 'Get file',
      notes: 'Get file',
      tags: ['api', 'file', 'get'],
      validate: {
        params: {
          fileId: Joi.number().min(1).required().description('File Id')
        }
      }
    }
  })
}
