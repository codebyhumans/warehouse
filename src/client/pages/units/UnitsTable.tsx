import React, {
  useState,
  useEffect,
  RefForwardingComponent,
  useImperativeHandle,
  forwardRef,
} from 'react'

import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu'
import EditorMoreIcon from '@atlaskit/icon/glyph/editor/more'
import SuccessIcon from '@atlaskit/icon/glyph/check-circle'
import { colors } from '@atlaskit/theme'

import { useNotifications } from '@client/components/Notifications'
import { Table } from '@client/components/Table'
import { unitsService } from '@client/services/units-service'
import { useModals } from '@client/components/Modals'
import { IUnit } from '@common/database/types/unit'
import { UnitManageModal } from './UnitManageModal'

export interface IUnitsTableHandles {
  refresh: () => void
}

const TableComponent: RefForwardingComponent<IUnitsTableHandles> = (
  props,
  ref,
) => {
  const { closeModal, openModal, openDialog } = useModals()
  const [data, setData] = useState<IUnit[]>([])
  const { notify } = useNotifications()

  const load = async () => {
    const units = await unitsService.getAllUnits()
    setData(units)
  }

  useEffect(() => {
    load()
  }, [])

  useImperativeHandle(ref, () => ({
    refresh: load,
  }))

  const onUnitEdit = (unit: IUnit) => () =>
    openModal(() => <UnitManageModal onSuccess={load} id={unit.id} />)

  const onUnitDelete = (unit: IUnit) => () =>
    openDialog({
      heading: 'Удаление единицы измерения',
      content: `Вы действительно хотите удалить единицу измерения "${unit.name}"?`,
      appearance: 'danger',
      actions: [
        {
          text: 'Удалить',
          async onClick() {
            await unitsService.deleteUnitById(unit.id)

            notify({
              title: `Единица измерения успешно удалена`,
              icon: (
                <SuccessIcon
                  primaryColor={colors.G300}
                  label="add-user-success"
                />
              ),
            })

            load()
            closeModal()
          },
        },
      ],
    })

  return (
    <Table<IUnit>
      name="units"
      data={data}
      columns={[
        {
          Header: 'Название',
          accessor: 'name',
        },
        {
          Header: 'Мера',
          accessor: 'measure',
          Cell: ({ cell }) => <i>{cell.value}</i>,
        },
        {
          Header: '',
          accessor: 'id',
          width: 100,
          Cell: ({ cell }) => (
            <DropdownMenu
              trigger={<EditorMoreIcon label="Действия" />}
              triggerType="button">
              <DropdownItemGroup>
                <DropdownItem onClick={onUnitEdit(cell.row.original)}>
                  Редактировать
                </DropdownItem>
                <DropdownItem onClick={onUnitDelete(cell.row.original)}>
                  Удалить
                </DropdownItem>
              </DropdownItemGroup>
            </DropdownMenu>
          ),
        },
      ]}
    />
  )
}

export const UnitsTable = forwardRef(TableComponent)
