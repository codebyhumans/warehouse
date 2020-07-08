import React from 'react';
import styled from 'styled-components';
import { createBrowserHistory } from 'history';
import { Router as AppRouter } from 'react-router-dom';

import { Notifications } from '@client/components/Notifications';
import { Modals } from '@client/components/Modals';
import { Routes } from '@client/Routes';

const history = createBrowserHistory();

export const App: React.FC = () => (
  <Wrapper>
    <Modals />
    <Notifications />
    <AppRouter history={history}>
      <Routes />
    </AppRouter>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
