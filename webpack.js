const config = require('./config/server.js')

if (config.env === 'development') {
  const webpack = require('webpack')
  const webPackConfig = require('./config/webpack.dev.js')
  console.info('webpack started')
  var compiler = webpack(webPackConfig)
  compiler.run((err, stats) => {
    console.info('webpack finished')
    if (err) {
      console.log(err)
    } else {
      console.log(stats.compilation.errors)
    }
  })

  compiler.watch({
    aggregateTimeout: 30,
    poll: true
  }, (err, stats) => {
    if (err) {
      console.log(err)
    } else {
      console.log(stats.compilation.errors)
    }
  })
}
