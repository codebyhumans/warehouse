import React from 'react'

import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu'
import EditorMoreIcon from '@atlaskit/icon/glyph/editor/more'
import SuccessIcon from '@atlaskit/icon/glyph/check-circle'
import { colors } from '@atlaskit/theme'

import { useNotifications } from '@client/components/Notifications'
import { useTableProcessor } from '@client/components/Table'
import { unitsService } from '@client/services/units-service'
import { useModals } from '@client/components/Modals'
import { IUnit } from '@common/database/types/unit'
import { UnitManageModal } from './UnitManageModal'

export const useUnitsTable = () => {
  const { closeModal, openModal, openDialog } = useModals()
  const { notify } = useNotifications()

  const tableProcessor = useTableProcessor<IUnit>(unitsService.getAllUnits, {
    name: 'units',
    columns: [
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
    ],
  })

  const onUnitEdit = (unit: IUnit) => () =>
    openModal(() => (
      <UnitManageModal onSuccess={tableProcessor.refresh} id={unit.id} />
    ))

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

            tableProcessor.refresh()
            closeModal()
          },
        },
      ],
    })

  return tableProcessor
}
