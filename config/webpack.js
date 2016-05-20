const config = require('./server.js')
var path = require('path')

module.exports = {
  watch: (server) => {
    if (config.env === 'development') {
      const Webpack = require('webpack')
      const wpconf = {
        devtool: 'cheap-module-eval-source-map',
        entry: ['babel-polyfill', 'webpack-hot-middleware/client', './app/index.jsx'],
        // entry: { index: './app/index.jsx' },
        output: {
          filename: 'index.js',
          path: path.resolve('./public/src/'),
          publicPath: '/src/'
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
                presets: ['es2015', 'stage-0', 'react', 'react-hmre']
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
          new Webpack.HotModuleReplacementPlugin(),
          new Webpack.NoErrorsPlugin()
        ]
      }
      const compiler = new Webpack(wpconf)

      const assets = {
        // webpack-dev-middleware options
        // See https://github.com/webpack/webpack-dev-middleware
        noInfo: true,
        stats: { colors: true },
        quiet: true,
        publicPath: wpconf.output.publicPath
      }

      const hot = {
        // webpack-hot-middleware options
        // See https://github.com/glenjamin/webpack-hot-middleware
        publicPath: wpconf.output.publicPath,
        reload: true
      }

      server.register({
        register: require('hapi-webpack-plugin'),
        options: { compiler, assets, hot }
      }, (error) => {
        if (error) {
          return console.error('Hot reload', error)
        }
        return console.info('Hot reload ok')
      })
    }
  },
  build: (props) => { }
}
