import React, {
  useEffect,
  useImperativeHandle,
  RefForwardingComponent,
  useState,
  forwardRef,
} from 'react'

import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu'
import EditorMoreIcon from '@atlaskit/icon/glyph/editor/more'
import SuccessIcon from '@atlaskit/icon/glyph/check-circle'
import { colors } from '@atlaskit/theme'

import { providersService } from '@client/services/providers-service'
import { useNotifications } from '@client/components/Notifications'
import { ProviderDetailsModal } from './ProviderDetailsModal'
import { IProvider } from '@common/database/types/provider'
import { ProviderManageModal } from './ProviderManageModal'
import { useModals } from '@client/components/Modals'
import { Table } from '@client/components/Table'

export interface IProvidersTableHandles {
  refresh: () => void
}

const TableComponent: RefForwardingComponent<IProvidersTableHandles> = (
  props,
  ref,
) => {
  const { closeModal, openDialog, openModal } = useModals()
  const [data, setData] = useState<IProvider[]>([])
  const { notify } = useNotifications()

  const load = async () => {
    const providers = await providersService.getAllProviders()
    setData(providers)
  }

  useEffect(() => {
    load()
  }, [])

  useImperativeHandle(ref, () => ({
    refresh: load,
  }))

  const openProviderDetailsModal = (provider: IProvider) => {
    openModal(() => <ProviderDetailsModal provider={provider} />)
  }

  const onEdit = (data: IProvider) => () =>
    openModal(() => <ProviderManageModal onSuccess={load} id={data.id} />)

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

            load()
            closeModal()
          },
        },
      ],
    })

  return (
    <Table<IProvider>
      name="providers"
      onRowClick={openProviderDetailsModal}
      data={data}
      columns={[
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
      ]}
    />
  )
}

export const ProvidersTable = forwardRef(TableComponent)
