import React from 'react';
import PageHeader from '@atlaskit/page-header';
import Button, { ButtonGroup } from '@atlaskit/button';
import { Container } from '@client/theme/grid';

import { ProvidersTable } from './ProvidersTable';
import { useModals } from '@client/components/Modals';

const ActionsContent: React.FC = () => {
  const { setModal } = useModals();

  return (
    <ButtonGroup>
      <Button appearance="primary">Добавить поставщика</Button>
    </ButtonGroup>
  );
};

export const ProvidersPage: React.FC = () => {
  return (
    <Container>
      <PageHeader actions={<ActionsContent />}>Поставщики</PageHeader>
      <ProvidersTable />
    </Container>
  );
};
