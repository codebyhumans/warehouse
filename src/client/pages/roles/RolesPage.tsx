import React, { useRef } from 'react'
import PageHeader from '@atlaskit/page-header'
import { Container } from '@client/theme/grid'
import Button, { ButtonGroup } from '@atlaskit/button'

import { useModals } from '@client/components/Modals'
import { useRolesTable, IRolesTableHandles, RolesTable } from './RolesTable'
import { RoleManageModal } from './RoleManageModal'
import { Table } from '@client/components/Table'

interface IActionsProps {
  refresh: () => void
}

const ActionsContent: React.FC<IActionsProps> = (props) => {
  const { openModal } = useModals()

  return (
    <ButtonGroup>
      <Button
        appearance="primary"
        onClick={() =>
          openModal(() => <RoleManageModal onSuccess={props.refresh} />)
        }>
        Добавить
      </Button>
    </ButtonGroup>
  )
}

export const RolesPage: React.FC = () => {
  const tableRef = useRef<IRolesTableHandles>(null)

  const refreshTable = () => tableRef.current?.refresh()

  return (
    <Container>
      <PageHeader actions={<ActionsContent refresh={refreshTable} />}>
        Роли
      </PageHeader>
      <RolesTable ref={tableRef} />
    </Container>
  )
}
