import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { useHistory } from 'react-router'

import { SimpleLayout } from '@client/layouts/SimpleLayout'
import { BasicLayout } from '@client/layouts/BasicLayout'

import { StartScreen } from '@client/pages/start/StartPage'
import { LoginPage } from '@client/pages/start/LoginPage'

import { ProvidersPage } from '@client/pages/providers/ProvidersPage'
import { WarehousePage } from '@client/pages/warehouse/WarehousePage'
import { UsersPage } from '@client/pages/users/UsersPage'
import { UnitsPage } from '@client/pages/units/UnitsPage'
import { RolesPage } from '@client/pages/roles/RolesPage'

export const Routes: React.FC = () => {
  const history = useHistory()

  history.replace('/')

  return (
    <Switch>
      <Redirect from="/" to="/start" exact />
      <Route path={['/start', '/login']}>
        <SimpleLayout>
          <Switch>
            <Route path="/start" component={StartScreen} />
            <Route path="/login" component={LoginPage} />
          </Switch>
        </SimpleLayout>
      </Route>
      <Route path={['/warehouse', '/users', '/roles', '/providers', '/units']}>
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
  )
}
