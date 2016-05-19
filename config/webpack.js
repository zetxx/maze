const config = require('./server.js')
var path = require('path')

var exp;
if (config.env === 'development') {
  const Webpack = require('webpack')
  const compiler = new Webpack({
    devtool: 'cheap-module-eval-source-map',
    // entry: ['./app/index.jsx', 'babel-polyfill', 'webpack-hot-middleware/client'],
    entry: {index: './app/index.jsx'},
    output: {
      filename: 'index.js',
      path: path.resolve('./public/src/')
    },
    name: 'browser',
    bail: true,
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel', // 'babel-loader' is also a legal name to reference
          query: {
            // cacheDirectory: true,
            presets: ['es2015', 'stage-0', 'react']
          }
        },
        { test: /\.css$/, loader: 'style-loader!css-loader' }, // use ! to chain loaders
        { test: /\.png$/, loader: 'url-loader?limit=100000&mimetype=image/png' },
        { test: /\.json$/, loader: 'json' }
      ]
    },
    plugins: [
      new Webpack.SourceMapDevToolPlugin({
        filename: 'bundle.js.map',
        moduleFilenameTemplate: '[absolute-resource-path]',
        fallbackModuleFilenameTemplate: '[absolute-resource-path]'
      }),
      new Webpack.HotModuleReplacementPlugin()
    ]
  })

  compiler.run((err, stats) => {
    console.info('webpack finished')
    if (err) {
      console.log(err)
    } else {
      console.log('Compiled @', new Date())
    }
  })
  compiler.watch({
    aggregateTimeout: 30,
    poll: true
  }, (err, stats) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Build @', new Date())
    }
  })
  // const assets = {
  //   // webpack-dev-middleware options
  //   // See https://github.com/webpack/webpack-dev-middleware
  //   noInfo: true,
  //   stats: {colors: true},
  //   quiet: true,
  //   publicPath: '/src/'
  // }

  // const hot = {
  //   // webpack-hot-middleware options
  //   // See https://github.com/glenjamin/webpack-hot-middleware
  //   publicPath: '/src/'
  // }
  // exp = {
  //   register: require('hapi-webpack-plugin'),
  //   options: { compiler, assets, hot }
  // }
}

module.exports = exp
