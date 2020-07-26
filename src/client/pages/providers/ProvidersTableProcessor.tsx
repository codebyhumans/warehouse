import React from 'react'

import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu'
import EditorMoreIcon from '@atlaskit/icon/glyph/editor/more'
import SuccessIcon from '@atlaskit/icon/glyph/check-circle'
import { colors } from '@atlaskit/theme'

import { providersService } from '@client/services/providers-service'
import { useNotifications } from '@client/components/Notifications'
import { useTableProcessor } from '@client/components/Table'
import { IProvider } from '@common/database/types/provider'
import { ProviderManageModal } from './ProviderManageModal'
import { useModals } from '@client/components/Modals'
import { ProviderDetailsModal } from './ProviderDetailsModal'

export const useProvidersTable = () => {
  const { closeModal, openDialog, openModal } = useModals()
  const { notify } = useNotifications()

  const openProviderDetailsModal = (provider: IProvider) => {
    openModal(() => <ProviderDetailsModal provider={provider} />)
  }

  const tableProcessor = useTableProcessor<IProvider>(
    providersService.getAllProviders,
    {
      name: 'providers',
      columns: [
        {
          Header: 'Название',
          accessor: 'name',
        },
        {
          Header: 'Адрес',
          accessor: 'address',
        },
        {
          Header: 'Телефон',
          accessor: 'phone',
        },
        {
          Header: 'Почта',
          accessor: 'email',
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
                <DropdownItem onClick={onEdit(cell.row.original)}>
                  Редактировать
                </DropdownItem>
                <DropdownItem onClick={onDelete(cell.row.original)}>
                  Удалить
                </DropdownItem>
              </DropdownItemGroup>
            </DropdownMenu>
          ),
        },
      ],
      onRowClick: openProviderDetailsModal,
    },
  )

  const onEdit = (data: IProvider) => () =>
    openModal(() => (
      <ProviderManageModal onSuccess={tableProcessor.refresh} id={data.id} />
    ))

  const onDelete = (data: IProvider) => () =>
    openDialog({
      heading: 'Удаление поставщика',
      content: `Вы действительно хотите удалить поставщика "${data.name}"?`,
      appearance: 'danger',
      actions: [
        {
          text: 'Удалить',
          async onClick() {
            await providersService.deleteProviderById(data.id)

            notify({
              title: `Поставщик успешно удален`,
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
