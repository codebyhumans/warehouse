import React from 'react'
import styled from 'styled-components'

import { ProductsTable } from './ProductsTable'
import { OperationsTable } from './OperationsTable'
import { colors } from '@atlaskit/theme'

export const WarehousePage: React.FC = () => {
  return (
    <Container>
      <Sidebar>Sidebar</Sidebar>
      <Main>
        <MainSection>
          <ActionsBar />
          <ProductsTable categoryId={6} />
        </MainSection>
        <AddSection>
          <ActionsBar />
          <OperationsTable productId={1} />
        </AddSection>
      </Main>
    </Container>
  )
}

const Container = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`

const ActionsBar = styled.div`
  background: ${colors.N400A};
  height: 30px;
`

const Sidebar = styled.div`
  position: relative;
  z-index: -1;
  background: green;
  width: 280px;
  flex-shrink: 0;
  background: ${colors.N20};

  &:after {
    content: '';
    position: absolute;
    bottom: 0px;
    top: 0px;
    right: 0;
    opacity: 0.3;
    width: 3px;

    background: linear-gradient(
      to left,
      rgba(0, 0, 0, 0.2) 0px,
      rgba(0, 0, 0, 0.2) 1px,
      rgba(0, 0, 0, 0.1) 1px,
      rgba(0, 0, 0, 0) 100%
    );
  }
`

const Main = styled.div`
  flex: 1;
  overflow: auto;
`

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 60%;
  flex-shrink: 0;
`
const AddSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 40%;
  /* flex-shrink: 0; */
`
