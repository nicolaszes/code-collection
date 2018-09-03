import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';


let Router = DefaultRouter;


let routes = [
  {
    "path": "/animate",
    "exact": true,
    "component": require('../animate/index.js').default
  },
  {
    "path": "/basic",
    "exact": true,
    "component": require('../basic.js').default
  },
  {
    "path": "/components",
    "exact": true,
    "component": require('../components.js').default
  },
  {
    "path": "/",
    "exact": true,
    "component": require('../index.js').default
  }
];


export default function() {
  return (
<Router history={window.g_history}>
  <Route render={({ location }) =>
    renderRoutes(routes, {}, { location })
  } />
</Router>
  );
}
