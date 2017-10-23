import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import routes from 'route';
import routeGenerator from 'routeGenerator';

render(
  <BrowserRouter>
    { routeGenerator(routes) }
  </BrowserRouter>,
  document.getElementById('app')
);
