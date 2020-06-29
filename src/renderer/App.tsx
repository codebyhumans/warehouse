import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Users } from './modules/users/controls/users';

export default () => (
  <Switch>
    <Route exact={true} path="/" component={Users} />
  </Switch>
);
