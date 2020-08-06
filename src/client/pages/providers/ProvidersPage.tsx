import React, { useRef } from 'react'

import Button, { ButtonGroup } from '@atlaskit/button'
import PageHeader from '@atlaskit/page-header'
import { Container } from '@client/theme/grid'

import { ProvidersTable, IProvidersTableHandles } from './ProvidersTable'
import { ProviderManageModal } from './ProviderManageModal'
import { useModals } from '@client/components/Modals'

interface IActionsProps {
  refresh: () => void
}

const ActionsContent: React.FC<IActionsProps> = (props) => {
  const { openModal } = useModals()

  const handleOnClick = () => {
    openModal(() => <ProviderManageModal onSuccess={props.refresh} />)
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
  const tableRef = useRef<IProvidersTableHandles>(null)

  const refreshTable = () => tableRef.current?.refresh()

  return (
    <Container>
      <PageHeader actions={<ActionsContent refresh={refreshTable} />}>
        Поставщики
      </PageHeader>
      <ProvidersTable ref={tableRef} />
    </Container>
  )
}
