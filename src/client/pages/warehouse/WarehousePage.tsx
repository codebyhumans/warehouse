import React, { useState } from 'react'
import PageHeader from '@atlaskit/page-header'
import { Container } from '@client/theme/grid'
import { WarehouseTree } from './WarehouseTree'
import { Table } from '@client/components/Table'
import { useProductsTable } from './ProductsTableProcessor'
import { useOperationsTable } from './OperationsTableProcessor'

export const WarehousePage: React.FC = () => {
  const { settings: productsSettings } = useProductsTable(6)
  const { settings: operationsSettings } = useOperationsTable(1)

  return (
    <Container>
      <PageHeader>Склад</PageHeader>
      {/* <WarehouseTree /> */}

      <Table {...productsSettings} />
      <Table {...operationsSettings} />
    </Container>
  )
}
