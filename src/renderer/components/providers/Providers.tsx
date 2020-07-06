import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import DynamicTable from '@atlaskit/dynamic-table';

import { useStores } from '../../stores/appStore';
import { Container } from '../../theme/grid';

import { createTableHeader, createTableRows } from './providers.data';

export const Providers: React.FC = observer(() => {
  const { providers, sortOrder, sortKey, setSortParams, loadProviders } = useStores().providersStore;

  useEffect(() => {
    loadProviders();
  }, []);

  const handleSort = (data: any) => {
    setSortParams(data.key, data.sortOrder);
  };

  return (
    <Container>
      <DynamicTable
        caption="Поставщики"
        head={createTableHeader()}
        rows={createTableRows(providers)}
        rowsPerPage={30}
        defaultPage={1}
        sortOrder={sortOrder}
        sortKey={sortKey}
        onSort={handleSort}
      />
    </Container>
  );
});
