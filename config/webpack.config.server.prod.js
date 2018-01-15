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
          compact: true
        },
      },
    ],
  },
  plugins: [
    // Minify the code.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        // Disabled because of an issue with Uglify breaking seemingly valid code:
        comparisons: false,
      },
      mangle: {
        safari10: true,
      },
      output: {
        comments: false,
        // Turned on because emoji and regex is not minified properly using default
        ascii_only: true,
      },
      sourceMap: shouldUseSourceMap,
    })
  ]
};
