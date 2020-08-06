import React, {
  useState,
  useEffect,
  useImperativeHandle,
  RefForwardingComponent,
  forwardRef,
} from 'react'

import EditorMoreIcon from '@atlaskit/icon/glyph/editor/more'
import SuccessIcon from '@atlaskit/icon/glyph/check-circle'
import { colors } from '@atlaskit/theme'
import Tag from '@atlaskit/tag'
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu'

import { permissionsService } from '@client/services/permissions-servise'
import { useNotifications } from '@client/components/Notifications'
import { rolesService } from '@client/services/roles-service'
import { useModals } from '@client/components/Modals'
import { IRole } from '@common/database/types/role'
import { RoleManageModal } from './RoleManageModal'
import { Table } from '@client/components/Table'
import { Date } from '@client/components/Date'

export interface IRolesTableHandles {
  refresh: () => void
}

const TableComponent: RefForwardingComponent<IRolesTableHandles> = (
  props,
  ref,
) => {
  const { closeModal, openModal, openDialog } = useModals()
  const [data, setData] = useState<IRole[]>([])
  const { notify } = useNotifications()

  const load = async () => {
    const roles = await rolesService.getAllRoles()
    setData(roles)
  }

  useEffect(() => {
    load()
  }, [])

  useImperativeHandle(ref, () => ({
    refresh: load,
  }))

  const onEdit = (role: IRole) => () =>
    openModal(() => <RoleManageModal onSuccess={load} id={role.id} />)

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

            load()
            closeModal()
          },
        },
      ],
    })

  return (
    <Table<IRole>
      name="roles"
      data={data}
      columns={[
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
          Cell: ({ cell }) =>
            permissionsService.getCountPermissions(cell.value),
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
      ]}
    />
  )
}

export const RolesTable = forwardRef(TableComponent)
