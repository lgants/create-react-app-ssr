const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.server.base.js');
const webpackNodeExternals = require('webpack-node-externals');
const paths = require('./paths');

const config = {
  // Inform webpack to build a bundle for nodeJS, rather than for the browser
  target: 'node',

  // Tell webpack the root file of the server application
  entry: paths.server.root,

  // Tell webpack where to put the output file
  output: {
    filename: 'bundle.js',
    path: paths.server.build
  },

  // Tells webpack to not bundle any libraries into output server-side bundle if that library exists inside the node modules folder, which speeds webpack by reducing bundle size
  externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, config);
