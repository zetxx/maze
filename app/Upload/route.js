// const Joi = require('joi')
const path = require('path')
const fs = require('fs')
const preHandlers = require('../preHandlers')

module.exports = function(registrar) {
  registrar({
    method: 'POST',
    path: '/api/upload',
    config: {
      pre: preHandlers,
      payload: {
          output: 'stream',
          parse: true,
          allow: 'multipart/form-data'
      },
      handler: function (req, resp) {
        var data = req.payload;
        var filenames = Object.keys(data);
        if (filenames) {
          filenames
            .reduce((chain, originFileName) => {
              return chain
                .then((r) => {
                  return new Promise((resolve, reject) => {
                    var file = data[originFileName]
                    var fileName = `${Math.random()}_${Date.now()}_${originFileName}`
                    var fullFilePath = path.join(path.dirname(require.main.filename), 'uploads', fileName);
                    var destFile = fs.createWriteStream(fullFilePath);
                    file.pipe(destFile);

                    file.on('end', function (err) {
                      r.push({
                        fileName: fileName,
                        originFileName: originFileName,
                        'content-type': file.hapi.headers['content-type']
                      })
                      resolve(r)
                    })
                  })
                })
            }, Promise.resolve([]))
            .then(resp)
        }
      },
      description: 'File upload',
      notes: 'File upload',
      tags: ['api', 'file', 'upload'],
      // validate: {
      //   payload: {
      //     name: Joi.string().required().description('Product name'),
      //     barcode: Joi.number().min(3).description('Product Bar code'),
      //     description: Joi.string().required().description('Product description'),
      //     category: Joi.number().min(1).required().description('Product category'),
      //     supplier: Joi.number().min(1).required().description('Supplier'),
      //     quantityTypeId: Joi.number().min(1).required().description('one of: piece or weight'),
      //     price: Joi.string().regex(/[\d]+\.[\d]{2,2}/).required().description('Product Price')
      //   }
      // }
    }
  })

}
