import React from 'react'
import PageHeader from '@atlaskit/page-header'
import Button, { ButtonGroup } from '@atlaskit/button'
import { Container } from '@client/theme/grid'

import { useProvidersTable } from './ProvidersTableProcessor'
import { ProviderManageModal } from './ProviderManageModal'
import { useModals } from '@client/components/Modals'
import { Table } from '@client/components/Table'

const ActionsContent: React.FC<{ refresh: () => void }> = ({ refresh }) => {
  const { openModal } = useModals()

  const handleOnClick = () => {
    openModal(() => <ProviderManageModal onSuccess={refresh} />)
  }

  return (
    <ButtonGroup>
      <Button appearance="primary" onClick={handleOnClick}>
        Добавить
      </Button>
    </ButtonGroup>
  )
}

export const ProvidersPage: React.FC = () => {
  const { settings, refresh } = useProvidersTable()

  return (
    <Container>
      <PageHeader actions={<ActionsContent refresh={refresh} />}>
        Поставщики
      </PageHeader>
      <Table {...settings} />
    </Container>
  )
}
