var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    index: './app/index.jsx'
  },
  output: {
    filename: './public/src/[name].js'
  },
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
          presets: ['react', 'es2015']
        }
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' }, // use ! to chain loaders
      { test: /\.png$/, loader: 'url-loader?limit=100000&mimetype=image/png' },
      { test: /\.json$/, loader: 'json' }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
