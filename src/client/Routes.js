import React from 'react';
import { Route } from 'react-router-dom';
import App from './components/App';
import NotFound from './containers/NotFound';
import Home from './containers/Home';

export default [
  {
    ...App,
    routes: [
      {
        ...Home,
        path: '/',
        exact: true
      },
      {
        ...NotFound
      }
    ]
  }
]
