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
    modules: ['node_modules', paths.nodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
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
          ],
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/ directory for faster rebuilds.
          cacheDirectory: true,
        }
      }
    ],
  }
};
