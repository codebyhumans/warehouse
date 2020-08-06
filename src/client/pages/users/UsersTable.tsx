import React, {
  useState,
  useEffect,
  useImperativeHandle,
  RefForwardingComponent,
  forwardRef,
} from 'react'
import styled from 'styled-components'

import EditorSuccessIcon from '@atlaskit/icon/glyph/editor/success'
import EditorMoreIcon from '@atlaskit/icon/glyph/editor/more'
import SuccessIcon from '@atlaskit/icon/glyph/check-circle'
import { colors } from '@atlaskit/theme'
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu'

import { useNotifications } from '@client/components/Notifications'
import { usersService } from '@client/services/users-service'
import { useModals } from '@client/components/Modals'
import { UserManageModal } from './UserManageModal'
import { IUser } from '@common/database/types/user'
import { Date } from '@client/components/Date'
import { useStores } from '@client/stores'
import { Table } from '@client/components/Table'

export interface IUsersTableHandles {
  refresh: () => void
}

const TableComponent: RefForwardingComponent<IUsersTableHandles> = (
  props,
  ref,
) => {
  const { closeModal, openModal, openDialog } = useModals()
  const { isCurrentUser } = useStores().userStore
  const { notify } = useNotifications()

  const [data, setData] = useState<IUser[]>([])

  const load = async () => {
    const users = await usersService.getAllUsers()
    setData(users)
  }

  useEffect(() => {
    load()
  }, [])

  useImperativeHandle(ref, () => ({
    refresh: load,
  }))

  const onEdit = (user: IUser) => () =>
    openModal(() => <UserManageModal onSuccess={load} id={user.id} />)

  const onDelete = (user: IUser) => () =>
    openDialog({
      heading: 'Удаление пользователя',
      content: `Вы действительно хотите удалить пользователя "${user.name}"?`,
      appearance: 'danger',
      actions: [
        {
          text: 'Удалить',
          async onClick() {
            await usersService.removeUserById(user.id)

            notify({
              title: `Пользователь успешно удален`,
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
    <Table<IUser>
      name="users"
      data={data}
      columns={[
        {
          Header: 'Имя',
          accessor: 'name',
          Cell: ({ cell }) => (
            <CellName>
              {cell.row.original.name}
              {isCurrentUser(cell.row.original.id) && (
                <CellNameIcon>
                  <EditorSuccessIcon
                    primaryColor={colors.G300}
                    label="same-user"
                    size="small"
                  />
                </CellNameIcon>
              )}
            </CellName>
          ),
        },
        {
          Header: 'Роль',
          accessor: 'roleName',
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
          disableResizing: true,
          width: 100,
          Cell: ({ cell }) => (
            <DropdownMenu
              trigger={<EditorMoreIcon label="Действия" />}
              triggerType="button">
              <DropdownItemGroup>
                <DropdownItem onClick={onEdit(cell.row.original)}>
                  Редактировать
                </DropdownItem>
                {!isCurrentUser(cell.row.original.id) && (
                  <DropdownItem onClick={onDelete(cell.row.original)}>
                    Удалить
                  </DropdownItem>
                )}
              </DropdownItemGroup>
            </DropdownMenu>
          ),
        },
      ]}
    />
  )
}

const CellName = styled.div`
  display: flex;
  align-items: center;
`

const CellNameIcon = styled.div`
  margin-left: 5px;
`

export const UsersTable = forwardRef(TableComponent)
