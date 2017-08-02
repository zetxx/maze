// const Joi = require('joi')
const path = require('path')
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
        if (data.file) {
          var name = data.file.hapi.filename;
          var path = path.join(__dirname, 'uploads', name);
          var file = fs.createWriteStream(path);

          file.on('error', function (err) {
              console.error(err)
              resp(new Error('File upload error'));
          });

          data.file.pipe(file);

          data.file.on('end', function (err) {
            var ret = {
              filename: data.file.hapi.filename,
              headers: data.file.hapi.headers
            }
            resp(JSON.stringify(ret));
          })
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
