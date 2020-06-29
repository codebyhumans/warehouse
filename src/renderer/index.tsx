import React from 'react';
import { render } from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';

const history = createBrowserHistory();

const App = () => <Router history={history}>Router</Router>;

render(<App />, document.getElementById('root'));
