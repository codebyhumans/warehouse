import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { SignIn } from './components/authentication/SignIn';

export default () => (
  <Switch>
    <Route exact={true} path="/" component={SignIn} />
  </Switch>
);
