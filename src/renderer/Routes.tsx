import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom';

import { SimpleLayout } from '@layouts/SimpleLayout';
import { BasicLayout } from '@layouts/BasicLayout';

import { SignIn } from '@components/authentication/SignIn';
import { StartScreen } from '@components/StartScreen';

import { ProvidersPage } from '@pages/providers/ProvidersPage';
import { UsersPage } from '@pages/users/UsersPage';
import { UnitsPage } from '@pages/units/UnitsPage';

export const Routes: React.FC = () => {
  const history = useHistory();
  history.replace('/');

  return (
    <Router>
      <Switch>
        <Redirect from="/" to="/start" exact />
        <Route path={['/start', '/signin']}>
          <SimpleLayout>
            <Switch>
              <Route path="/start" component={StartScreen} />
              <Route path="/signin" component={SignIn} />
            </Switch>
          </SimpleLayout>
        </Route>
        <Route path={['/users', '/providers', '/units']}>
          <BasicLayout>
            <Switch>
              <Route path="/users" component={UsersPage} />
              <Route path="/providers" component={ProvidersPage} />
              <Route path="/units" component={UnitsPage} />
            </Switch>
          </BasicLayout>
        </Route>
      </Switch>
    </Router>
  );
};
