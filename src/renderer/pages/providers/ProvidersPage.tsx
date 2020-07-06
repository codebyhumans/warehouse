import React from 'react';
import { Container } from '../../theme/grid';
import PageHeader from '@atlaskit/page-header';
import Button, { ButtonGroup } from '@atlaskit/button';

const actionsContent = (
  <ButtonGroup>
    <Button appearance="primary">Добавить поставщика</Button>
  </ButtonGroup>
);

export const ProvidersPage: React.FC = () => {
  return (
    <Container>
      <PageHeader actions={actionsContent}>Поставщики</PageHeader>
    </Container>
  );
};
