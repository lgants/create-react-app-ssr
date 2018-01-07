import React from 'react';
import { Route } from 'react-router-dom';
import App from './components/App';
import NotFound from './containers/NotFound';

export default [
  {
    ...App,
    routes: [
      {
        ...NotFound
      }
    ]
  }
]
