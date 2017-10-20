import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';

import Home from 'pages/Home';

const history = createBrowserHistory();

render(
  <Router>
    <Route path="/" component={Home} />
  </Router>,
  document.body
);
