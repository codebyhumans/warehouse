import React from 'react'
import PageHeader from '@atlaskit/page-header'
import Button, { ButtonGroup } from '@atlaskit/button'
import { Container } from '@client/theme/grid'

import { ProvidersTable } from './ProvidersTable'
import { ProviderModal } from './ProviderModal'
import { useModals } from '@client/components/Modals'

const ActionsContent: React.FC = () => {
  const { openModal } = useModals()

  const handleOnClick = () => {
    openModal(() => <ProviderModal />)
  }

  return (
    <ButtonGroup>
      <Button appearance="primary" onClick={handleOnClick}>
        Добавить поставщика
      </Button>
    </ButtonGroup>
  )
}

export const ProvidersPage: React.FC = () => (
  <Container>
    <PageHeader actions={<ActionsContent />}>Поставщики</PageHeader>
    <ProvidersTable />
  </Container>
)
