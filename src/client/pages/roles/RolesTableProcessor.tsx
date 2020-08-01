import React from 'react'

import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu'
import EditorMoreIcon from '@atlaskit/icon/glyph/editor/more'
import SuccessIcon from '@atlaskit/icon/glyph/check-circle'
import { colors } from '@atlaskit/theme'

import { useNotifications } from '@client/components/Notifications'
import { rolesService } from '@client/services/roles-service'
import { useTableProcessor } from '@client/components/Table'
import { useModals } from '@client/components/Modals'
import { IRole } from '@common/database/types/role'
import { RoleManageModal } from './RoleManageModal'
import { permissionsService } from '@client/services/permissions-servise'
import { Date } from '@client/components/Date'
import Tag from '@atlaskit/tag'

export const useRolesTable = () => {
  const { closeModal, openModal, openDialog } = useModals()
  const { notify } = useNotifications()

  const tableProcessor = useTableProcessor<IRole>(rolesService.getAllRoles, {
    name: 'units',
    columns: [
      {
        Header: 'Название',
        accessor: 'name',
        Cell: ({ cell }) => (
          <>
            {cell.row.original.system ? (
              <Tag text={cell.value} color="blueLight" />
            ) : (
              cell.value
            )}
          </>
        ),
      },
      {
        Header: 'Кол-во прав',
        accessor: 'permissions',
        Cell: ({ cell }) => permissionsService.getCountPermissions(cell.value),
      },
      {
        Header: 'Дата создания',
        accessor: 'createdAt',
        Cell: ({ cell }) => <Date value={cell.value} />,
      },
      {
        Header: 'Дата обновления',
        accessor: 'updatedAt',
        Cell: ({ cell }) => <Date value={cell.value} />,
      },
      {
        Header: '',
        accessor: 'id',
        width: 100,
        Cell: ({ cell }) => (
          <>
            {!cell.row.original.system && (
              <DropdownMenu
                trigger={<EditorMoreIcon label="Действия" />}
                triggerType="button">
                <DropdownItemGroup>
                  <DropdownItem onClick={onEdit(cell.row.original)}>
                    Редактировать
                  </DropdownItem>
                  <DropdownItem onClick={onDelete(cell.row.original)}>
                    Удалить
                  </DropdownItem>
                </DropdownItemGroup>
              </DropdownMenu>
            )}
          </>
        ),
      },
    ],
  })

  const onEdit = (role: IRole) => () =>
    openModal(() => (
      <RoleManageModal onSuccess={tableProcessor.refresh} id={role.id} />
    ))

  const onDelete = (role: IRole) => () =>
    openDialog({
      heading: 'Удаление роли',
      content: `Вы действительно хотите удалить роль "${role.name}"?`,
      appearance: 'danger',
      actions: [
        {
          text: 'Удалить',
          async onClick() {
            await rolesService.deleteRoleById(role.id)

            notify({
              title: `Роль успешно удалена`,
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
