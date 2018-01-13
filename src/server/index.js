import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import Routes from '../client/Routes';
import renderer from '../helpers/renderer';
import createStore from '../helpers/createStore';

const app = express();
const port = process.env.PORT || 5000;

// Use proxy to setup cookies with renderer server rather than the API because cookies are tied to a specific domain (i.e. tricks browser since it doesn't see what happens past the proxy)
app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {
  // Provide redirect destination for OAuth
  proxyReqOptDecorator(opts) {
    opts.headers['x-forwarded-host'] = 'localhost:3000';
    return opts;
  }
}));

app.use(express.static('build/server'));

app.get('*', (req, res) => {
  // Create store outside renderer
  const store = createStore(req);

  // Array of promises representing pending network requests
  const promises = matchRoutes(Routes, req.path)
  .map(({ route }) => {
    return route.loadData ? route.loadData : null;
  })
  .map(promise => {
    if (promise) {
      return new Promise((resolve, reject) => {
        // Always resolves the inner wrapped promise
        promise.then(resolve).catch(resolve);
      });
    }
  });

  Promise.all(promises).then(() => {
    const context = {}

    // Pass request into renderer, which passes request to StaticRouter that uses the request to decide the components used to render on the screen
    // Sends the response after all promises are resolved
    const content = renderer(req, store, context)

    if (context.notFound) {
      res.status(404)
    }

    res.send(content);

  })
});

// var env = process.env.NODE_ENV === 'development';

if (process.env.NODE_ENV === "development") {
  var chokidar = require('chokidar')
  var watcher = chokidar.watch('../src/server')
  watcher.on('ready', function() {
    watcher.on('all', function() {
      console.log("Clearing /dist/ module cache from server")
      Object.keys(require.cache).forEach(function(id) {
        if (/[\/\\]dist[\/\\]/.test(id)) delete require.cache[id]
      })
    })
  })
}

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
