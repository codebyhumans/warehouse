import React, { useRef } from 'react'

import Button, { ButtonGroup } from '@atlaskit/button'
import PageHeader from '@atlaskit/page-header'

import { UsersTable, IUsersTableHandles } from './UsersTable'
import { useModals } from '@client/components/Modals'
import { UserManageModal } from './UserManageModal'
import { Container } from '@client/theme/grid'

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
          openModal(() => <UserManageModal onSuccess={props.refresh} />)
        }>
        Добавить
      </Button>
    </ButtonGroup>
  )
}

export const UsersPage: React.FC = () => {
  const tableRef = useRef<IUsersTableHandles>(null)

  const refreshTable = () => tableRef.current?.refresh()

  return (
    <Container>
      <PageHeader actions={<ActionsContent refresh={refreshTable} />}>
        Пользователи
      </PageHeader>
      <UsersTable ref={tableRef} />
    </Container>
  )
}
