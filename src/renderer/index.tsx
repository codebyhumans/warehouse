import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';

import '!style-loader!css-loader!@atlaskit/css-reset/dist/bundle.css';

import { createBrowserHistory } from 'history';

import { App } from './App';

const history = createBrowserHistory();

render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root'),
);
