import React from 'react';
import styled from 'styled-components';

import { SignInForm } from './SignInForm';

export const SignIn: React.FC = () => (
  <Wrapper>
    <SignInForm />
  </Wrapper>
);

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;
