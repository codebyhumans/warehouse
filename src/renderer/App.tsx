import React from 'react';
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useStores } from './stores/appStore';

import { SignIn } from './components/authentication/SignIn';
import { Users } from './components/users/Users';

const ProtectedRoute: React.FC<RouteProps> = observer(({ children, ...rest }) => {
  const { currentUser } = useStores().authenticationStore;

  if (!currentUser) {
    return <Redirect to="/signin" />;
  }

  return <Route {...rest} render={() => children} />;
});

export const App = () => (
  <Switch>
    <ProtectedRoute exact={true} path="/" component={Users} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" />
  </Switch>
);
