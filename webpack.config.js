var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: '#inline-source-map',
  entry: [
    './js/app.js',
  ],
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      include: [
        __dirname,
        path.join(__dirname, '..', 'js'),
      ],
    }, {
      test: /\.scss$/,
      loader: 'style!css!sass?sourceMap=true&sourceMapContents=true',
    }],
  },
};
