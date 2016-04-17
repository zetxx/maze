const path = require('path');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    modulesDirectories: ['node_modules'],
    alias: {},
    extensions: ['', '.jsx', '.js']
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
  }
}