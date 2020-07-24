import React from 'react'
import PageHeader from '@atlaskit/page-header'
import { Container } from '@client/theme/grid'
import Button, { ButtonGroup } from '@atlaskit/button'

import { useModals } from '@client/components/Modals'
import { Table } from '@client/components/Table'
import { useUnitsTable } from './UnitsTableProcessor'
import { UnitManageModal } from './UnitManageModal'

const ActionsContent: React.FC<{ refresh: () => void }> = (props) => {
  const { openModal } = useModals()

  return (
    <ButtonGroup>
      <Button
        appearance="primary"
        onClick={() =>
          openModal(() => <UnitManageModal onSuccess={props.refresh} />)
        }>
        Добавить
      </Button>
    </ButtonGroup>
  )
}

export const UnitsPage: React.FC = () => {
  const { settings, refresh } = useUnitsTable()

  return (
    <Container>
      <PageHeader actions={<ActionsContent refresh={refresh} />}>
        Единицы измерения
      </PageHeader>
      <Table {...settings} />
    </Container>
  )
}
