import React from 'react'
import styled from 'styled-components'

import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu'
import EditorSuccessIcon from '@atlaskit/icon/glyph/editor/success'
import EditorMoreIcon from '@atlaskit/icon/glyph/editor/more'
import SuccessIcon from '@atlaskit/icon/glyph/check-circle'
import { colors } from '@atlaskit/theme'

import { useNotifications } from '@client/components/Notifications'
import { usersService } from '@client/services/users-service'
import { useTableProcessor } from '@client/components/Table'
import { useModals } from '@client/components/Modals'
import { UserManageModal } from './UserManageModal'
import { IUser } from '@common/database/types/user'
import { Date } from '@client/components/Date'
import { useStores } from '@client/stores'

export const useUsersTable = () => {
  const { closeModal, openModal, openDialog } = useModals()
  const { isCurrentUser } = useStores().userStore
  const { notify } = useNotifications()

  const tableProcessor = useTableProcessor<IUser>(
    () => usersService.getAllUsers(),
    {
      name: 'users',
      columns: [
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
      ],
    },
  )

  const onEdit = (user: IUser) => () =>
    openModal(() => (
      <UserManageModal onSuccess={tableProcessor.refresh} id={user.id} />
    ))

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

            tableProcessor.refresh()
            closeModal()
          },
        },
      ],
    })

  return tableProcessor
}

const CellName = styled.div`
  display: flex;
  align-items: center;
`

const CellNameIcon = styled.div`
  margin-left: 5px;
`
