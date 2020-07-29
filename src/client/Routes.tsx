import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import { useHistory } from 'react-router'

import { SimpleLayout } from '@client/layouts/SimpleLayout'
import { BasicLayout } from '@client/layouts/BasicLayout'

import { StartScreen } from '@client/components/StartScreen'
import { SignIn } from '@client/components/authentication/SignIn'

import { ProvidersPage } from '@client/pages/providers/ProvidersPage'
import { WarehousePage } from './pages/warehouse/WarehousePage'
import { UsersPage } from '@client/pages/users/UsersPage'
import { UnitsPage } from '@client/pages/units/UnitsPage'
import { RolesPage } from './pages/roles/RolesPage'

export const Routes: React.FC = () => {
  const history = useHistory()

  history.replace('/')

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
        <Route
          path={['/warehouse', '/users', '/roles', '/providers', '/units']}>
          <BasicLayout>
            <Switch>
              <Route path="/warehouse" component={WarehousePage} />
              <Route path="/users" component={UsersPage} />
              <Route path="/roles" component={RolesPage} />
              <Route path="/providers" component={ProvidersPage} />
              <Route path="/units" component={UnitsPage} />
            </Switch>
          </BasicLayout>
        </Route>
      </Switch>
    </Router>
  )
}
