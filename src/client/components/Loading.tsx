import React from 'react';
import styled from 'styled-components';
import Spinner, { Size } from '@atlaskit/spinner';

interface IProps {
  loading: boolean;
  size?: Size;
}

export const Loading: React.FC<IProps> = ({ loading, size, children }) => {
  return (
    <Wrapper>
      {loading && (
        <Preloader>
          <Spinner size={size || 'medium'} />
        </Preloader>
      )}
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  min-height: 80px;
`;

const Preloader = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;
