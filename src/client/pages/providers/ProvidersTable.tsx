import React from 'react';
import { providersService } from '@client/services/providers-service';
import { Table, useTableProcessor } from '@client/components/Table';
import { useModals } from '@client/components/Modals';
import { ProviderModal } from './ProviderModal';
import Button from '@atlaskit/button';
import { IProvider } from '@common/database/types/provider';

export const ProvidersTable: React.FC = () => {
  const { setModal } = useModals();

  const setProviderModal = (id: number) => {
    setModal(() => <ProviderModal id={id} />);
  };

  const { settings } = useTableProcessor<IProvider>(providersService.getAllProviders, {
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
        Header: 'Банк',
        accessor: 'bankName',
      },
      {
        Header: 'Действия',
        accessor: 'id',
        Cell: ({ cell }) => <Button onClick={() => setProviderModal(cell.value)}>Обновить</Button>,
      },
    ],
  });

  return <Table {...settings} />;
};
