import React from 'react';
import PageHeader from '@atlaskit/page-header';
import Button, { ButtonGroup } from '@atlaskit/button';
import { Container } from '@client/theme/grid';

import { ProvidersTable } from './ProvidersTable';
import { useModals } from '@client/components/Modals';

import { ProviderModal } from './ProviderModal';

const ActionsContent: React.FC = () => {
  const modal = useModals();

  return (
    <ButtonGroup>
      <Button appearance="primary" onClick={() => modal.setModal(() => <ProviderModal id={1} />)}>
        Добавить поставщика
      </Button>
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
