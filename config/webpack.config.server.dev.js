const path = require('path');
const paths = require('./paths');
const eslintFormatter = require('react-dev-utils/eslintFormatter');

module.exports = {
  target: 'node',
  entry: paths.server.root,
  output: {
    filename: 'bundle.js',
    path: paths.server.build
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [
            'react',
            'es2015'
          ]
        }
      }
    ],
  },
  // watchOptions: {
  //   aggregateTimeout: 300,
  //   poll: 500,
  //   ignored: /node_modules/
  // }
};
