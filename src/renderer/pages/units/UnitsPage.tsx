import React from 'react';
import PageHeader from '@atlaskit/page-header';
import Button, { ButtonGroup } from '@atlaskit/button';
import { Container } from '@theme/grid';

import { UnitsTable } from './UnitsTable';

const actionsContent = (
  <ButtonGroup>
    <Button appearance="primary">Добавить ед.измерения</Button>
  </ButtonGroup>
);

export const UnitsPage: React.FC = () => (
  <Container>
    <PageHeader actions={actionsContent}>Еденицы измерения</PageHeader>
    <UnitsTable />
  </Container>
);
