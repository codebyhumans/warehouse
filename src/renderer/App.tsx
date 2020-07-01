import React from 'react';
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { SignIn } from './components/authentication/SignIn';
import { useStores } from './stores/appStore';

const ProtectedRoute: React.FC<RouteProps> = observer(({ children, ...rest }) => {
  const { currentUser } = useStores().authenticationStore;

  return <Route {...rest} render={() => (currentUser ? children : <Redirect to="/signin" />)} />;
});

export const App = () => (
  <Switch>
    <ProtectedRoute exact={true} path="/" />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" />
  </Switch>
);
