import React from 'react';
import PageHeader from '@atlaskit/page-header';
import { Container } from '@client/theme/grid';
import { WarehouseTree } from './WarehouseTree';

export const WarehousePage: React.FC = () => (
  <Container>
    <PageHeader>Склад</PageHeader>
    <WarehouseTree />
  </Container>
);
