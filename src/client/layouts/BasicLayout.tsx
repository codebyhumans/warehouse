import React from 'react';
import { Header } from '../components/Header';
import { PageLayout } from '@atlaskit/page-layout';
import styled from 'styled-components';

export const BasicLayout: React.FC = ({ children }) => {
  return (
    <Layout>
      <Header />
      <Content>{children}</Content>
    </Layout>
  );
};

const Layout = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
`;
