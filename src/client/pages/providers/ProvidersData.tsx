import React from 'react';
import { Provider } from '@prisma/client';
import { HeadType, RowType } from '@atlaskit/dynamic-table/dist/cjs/types';
import { useModals } from '@client/components/Modals';
import { ProviderModal, ProviderActions } from './ProviderModal';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';

enum ProviderKeys {
  Name = 'name',
  Address = 'address',
  Phone = 'phone',
  Email = 'email',
  BankName = 'bankName',
  BankAddress = 'bankAddress',
  BankMfo = 'bankMfo',
  BankExpense = 'bankExpense',
  Actions = 'actions',
}

const RowNames = {
  [ProviderKeys.Name]: 'Название',
  [ProviderKeys.Address]: 'Адрес',
  [ProviderKeys.Phone]: 'Телефон',
  [ProviderKeys.Email]: 'Почта',
  [ProviderKeys.BankName]: 'Банк',
  [ProviderKeys.BankAddress]: 'Адрес банка',
  [ProviderKeys.BankMfo]: 'МФО Банка',
  [ProviderKeys.BankExpense]: 'Банковские расходы',
  [ProviderKeys.Actions]: 'Действия',
};

export const createTableHeader = (withWidth?: boolean): HeadType => ({
  cells: [
    {
      key: ProviderKeys.Name,
      content: RowNames[ProviderKeys.Name],
      isSortable: true,
    },
    {
      key: ProviderKeys.Address,
      content: RowNames[ProviderKeys.Address],
    },
    {
      key: ProviderKeys.Phone,
      content: RowNames[ProviderKeys.Phone],
    },
    {
      key: ProviderKeys.Email,
      content: RowNames[ProviderKeys.Email],
    },
    {
      key: ProviderKeys.BankName,
      content: RowNames[ProviderKeys.BankName],
    },
    {
      key: ProviderKeys.Actions,
    },
  ],
});

export const createTableRows = (providers: Provider[]): RowType[] => {
  const { setModal } = useModals();

  const setProviderModal = (id: number, action: ProviderActions) => () => {
    console.log(id, action);
    setModal(() => <ProviderModal id={id} action={action} />);
  };

  return providers.map((p) => ({
    key: `${p.id}`,
    cells: [
      {
        key: ProviderKeys.Name,
        content: p.name,
      },
      {
        key: ProviderKeys.Address,
        content: p.address,
      },
      {
        key: ProviderKeys.Phone,
        content: p.phone,
      },
      {
        key: ProviderKeys.Email,
        content: p.email,
      },
      {
        key: ProviderKeys.BankName,
        content: p.bankName,
      },
      {
        key: ProviderKeys.Actions,
        content: (
          <DropdownMenu trigger="Действия" triggerType="button">
            <DropdownItemGroup>
              <DropdownItem
                onClick={(e: React.MouseEvent | React.KeyboardEvent) => {
                  e.preventDefault();
                  console.log(e);
                  //setModal(() => <ProviderModal id={p.id} action="info" />);
                }}
              >
                Информация
              </DropdownItem>
              <DropdownItem onClick={setProviderModal(p.id, 'update')}>Изменить</DropdownItem>
              <DropdownItem onClick={setProviderModal(p.id, 'delete')}>Удалить</DropdownItem>
            </DropdownItemGroup>
          </DropdownMenu>
        ),
      },
    ],
  }));
};
