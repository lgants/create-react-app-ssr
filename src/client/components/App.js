import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import '../styles/App.css';

const App = ({ route }) => {
  return (
    <div>
      {renderRoutes(route.routes)}
    </div>
  )
}

export default {
  component: App,
}
