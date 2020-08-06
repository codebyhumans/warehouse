import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { colors } from '@atlaskit/theme'

import { OperationsTable } from './operations/OperationsTable'
import { ProductsTable } from './products/ProductsTable'
import { localConfig } from '@common/local-config'

export const WarehousePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(
    localConfig.get('pages.warehouse.category', 6),
  )
  const [selectedProduct, setSelectedProduct] = useState<number>(
    localConfig.get('pages.warehouse.product', 1),
  )

  useEffect(() => {
    localConfig.set('pages.warehouse.category', selectedCategory)
  }, [selectedCategory])

  useEffect(() => {
    localConfig.set('pages.warehouse.product', selectedProduct)
  }, [selectedProduct])

  return (
    <Container>
      <Sidebar>Sidebar</Sidebar>
      <Main>
        <MainSection>
          <ActionsBar />
          <ProductsTable categoryId={selectedCategory} />
        </MainSection>
        <AddSection>
          <ActionsBar />
          <OperationsTable productId={selectedProduct} />
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
`
