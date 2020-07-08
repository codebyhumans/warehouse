import React from 'react';
import styled from 'styled-components';

export const SimpleLayout: React.FC = ({ children }) => {
  return <Layout>{children}</Layout>;
};

const Layout = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
