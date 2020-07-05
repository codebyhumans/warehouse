import React from 'react';
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useStores } from './stores/appStore';

import { SignIn } from './components/authentication/SignIn';
import { Layout } from './components/layout/Layout';

const ProtectedRoute: React.FC<RouteProps> = observer(({ children, ...rest }) => {
  const { currentUser } = useStores().authenticationStore;

  if (!currentUser) {
    return <Redirect to="/signin" />;
  }

  return <Route {...rest} render={() => children} />;
});

export const App = () => {
  //Компонент лоадинга. Предзагрузка данных

  return (
    <Switch>
      <Layout>
        <Route exact={true} path="/" render={() => <div>123</div>} />
      </Layout>

      <Route path="/signin" component={SignIn} />
      <Route path="/signup" />
    </Switch>
  );
};
