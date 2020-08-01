import React from 'react'

import Button, { ButtonGroup } from '@atlaskit/button'
import PageHeader from '@atlaskit/page-header'

import { useModals } from '@client/components/Modals'
import { Table } from '@client/components/Table'
import { Container } from '@client/theme/grid'
import { useUsersTable } from './UsersTableProcessor'
import { UserManageModal } from './UserManageModal'

const ActionsContent = () => {
  const { openModal } = useModals()

  return (
    <ButtonGroup>
      <Button
        appearance="primary"
        onClick={() => openModal(() => <UserManageModal />)}>
        Добавить
      </Button>
    </ButtonGroup>
  )
}

export const UsersPage: React.FC = () => {
  const { settings } = useUsersTable()

  return (
    <Container>
      <PageHeader actions={<ActionsContent />}>Пользователи</PageHeader>
      <Table {...settings} />
    </Container>
  )
}
