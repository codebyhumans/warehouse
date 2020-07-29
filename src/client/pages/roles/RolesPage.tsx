import React from 'react'
import PageHeader from '@atlaskit/page-header'
import { Container } from '@client/theme/grid'
import Button, { ButtonGroup } from '@atlaskit/button'

import { useModals } from '@client/components/Modals'
import { useRolesTable } from './RolesTableProcessor'
import { RoleManageModal } from './RoleManageModal'
import { Table } from '@client/components/Table'

const ActionsContent: React.FC<{ refresh: () => void }> = (props) => {
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
  const { settings, refresh } = useRolesTable()

  return (
    <Container>
      <PageHeader actions={<ActionsContent refresh={refresh} />}>
        Роли
      </PageHeader>
      <Table {...settings} />
    </Container>
  )
}
