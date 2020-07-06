import React from 'react';
import styled from 'styled-components';
import { createBrowserHistory } from 'history';
import { Router as AppRouter } from 'react-router-dom';

import { Routes } from './Routes';
import { Notifications } from './components/Notifications';

const history = createBrowserHistory();

export const App: React.FC = () => (
  <Wrapper>
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
