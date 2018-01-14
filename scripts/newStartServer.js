'use strict';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

process.on('unhandledRejection', err => {
  throw err;
});

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 5000;
const HOST = process.env.HOST || '0.0.0.0';

// Ensure environment variables are read.
require('../config/serverEnv');

const chalk = require('chalk');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../config/webpack.config.server.dev')


// TODO implement function to suggest alternate port if in use
const port = DEFAULT_PORT

const compiler = Webpack(webpackConfig);
const devServerOptions = Object.assign({}, webpackConfig.devServer, {
  disableHostCheck: true,
  compress: true,
  clientLogLevel: 'none',
  contentBase: '/Users/Logan/Development/projects/create-react-app-ssr/build/server',
  watchContentBase: true,
  hot: true,
  publicPath: '/',
  quiet: true,
  watchOptions:
   {
     ignored: /^(?!\/Users\/Logan\/Development\/projects\/create-react-app-ssr\/src\/client\/).+[\\\/]node_modules[\\\/]/g,
      aggregateTimeout: 200
  },
  stats: {
    colors: true
  }
});
  //
  //
  // contentBase: '/Users/Logan/Development/projects/create-react-app-ssr/public',
  // watchContentBase: true,
  // hot: true,
  // publicPath: '/',
  // quiet: true,
  // watchOptions:
  //  { ignored: /^(?!\/Users\/Logan\/Development\/projects\/create-react-app-ssr\/src\/client\/).+[\\\/]node_modules[\\\/]/g,
  //    aggregateTimeout: 200 },
  // https: false,
  // host: '0.0.0.0',
  // overlay: false,
  // historyApiFallback:
  //  { disableDotRule: true,
  //    htmlAcceptHeaders: [ 'text/html', '*/*' ],
  //    rewrites: [] },
  // public: '192.168.1.119',
  // proxy: undefined,
  // before: [Function: before],
  // reportTime: false,
  // reporter: [Function: defaultReporter],
  // log: [Function: bound bound consoleCall],
  // warn: [Function: bound bound consoleCall],
  // error: [Function: bound bound consoleCall],
  // stats: { context: '/Users/Logan/Development/projects/create-react-app-ssr' } }

const devServer = new WebpackDevServer(compiler, devServerOptions);

devServer.listen(port, HOST, err => {
  if (err) {
    return console.log(err);
  }
  console.log(chalk.cyan('Starting server on port ' + port));
});
