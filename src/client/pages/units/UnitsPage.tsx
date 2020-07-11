import React from 'react';
import PageHeader from '@atlaskit/page-header';
import Button, { ButtonGroup } from '@atlaskit/button';
import { Container } from '@client/theme/grid';

import { UnitsTable } from './UnitsTable';
import { useModals } from '@client/components/Modals';
import { UnitManageModal } from './UnitManageModal';

const ActionsContent: React.FC = () => {
  const { setModal } = useModals();

  return (
    <ButtonGroup>
      <Button appearance="primary" onClick={() => setModal(() => <UnitManageModal />)}>
        Добавить
      </Button>
    </ButtonGroup>
  );
};

export const UnitsPage: React.FC = () => (
  <Container>
    <PageHeader actions={<ActionsContent />}>Единицы измерения</PageHeader>
    <UnitsTable />
  </Container>
);
