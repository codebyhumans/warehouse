import React from 'react';
import PageHeader from '@atlaskit/page-header';
import Button, { ButtonGroup } from '@atlaskit/button';
import { Container } from '@theme/grid';

import { ProvidersTable } from './ProvidersTable';

const actionsContent = (
  <ButtonGroup>
    <Button appearance="primary">Добавить поставщика</Button>
  </ButtonGroup>
);

export const ProvidersPage: React.FC = () => (
  <Container>
    <PageHeader actions={actionsContent}>Поставщики</PageHeader>
    <ProvidersTable />
  </Container>
);
