import { Provider } from '@prisma/client';
import { HeadType, RowType } from '@atlaskit/dynamic-table/dist/cjs/types';

import { ProviderKeys } from '../../stores/providersStore';

const RowNames = {
  [ProviderKeys.Name]: 'Имя',
  [ProviderKeys.Address]: 'Адрес',
  [ProviderKeys.Phone]: 'Телефон',
  [ProviderKeys.Email]: 'Почта',
  [ProviderKeys.BankName]: 'Банк',
  [ProviderKeys.BankAddress]: 'Адрес банка',
  [ProviderKeys.BankMfo]: 'МФО Банка',
  [ProviderKeys.BankExpense]: 'Банковские расходы',
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
      key: ProviderKeys.BankAddress,
      content: RowNames[ProviderKeys.BankAddress],
    },
    {
      key: ProviderKeys.BankMfo,
      content: RowNames[ProviderKeys.BankMfo],
    },
    {
      key: ProviderKeys.BankExpense,
      content: RowNames[ProviderKeys.BankExpense],
    },
  ],
});

export const createTableRows = (providers: Provider[]): RowType[] =>
  providers.map((p) => ({
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
        key: ProviderKeys.BankAddress,
        content: p.bankAddress,
      },
      {
        key: ProviderKeys.BankMfo,
        content: p.bankMfo,
      },
      {
        key: ProviderKeys.BankExpense,
        content: p.bankExpense,
      },
    ],
  }));
