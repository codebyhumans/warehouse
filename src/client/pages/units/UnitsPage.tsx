import React, { useRef } from 'react'
import PageHeader from '@atlaskit/page-header'
import { Container } from '@client/theme/grid'
import Button, { ButtonGroup } from '@atlaskit/button'

import { UnitsTable, IUnitsTableHandles } from './UnitsTable'
import { useModals } from '@client/components/Modals'
import { UnitManageModal } from './UnitManageModal'

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
          openModal(() => <UnitManageModal onSuccess={props.refresh} />)
        }>
        Добавить
      </Button>
    </ButtonGroup>
  )
}

export const UnitsPage: React.FC = () => {
  const tableRef = useRef<IUnitsTableHandles>(null)

  const refreshTable = () => tableRef.current?.refresh()

  return (
    <Container>
      <PageHeader actions={<ActionsContent refresh={refreshTable} />}>
        Единицы измерения
      </PageHeader>
      <UnitsTable ref={tableRef} />
    </Container>
  )
}
