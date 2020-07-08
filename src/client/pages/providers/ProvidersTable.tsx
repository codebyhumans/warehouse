import React from 'react';
import DynamicTable from '@atlaskit/dynamic-table';
import { providersService } from '@client/services/providers-service';
import { useTableProcessor } from '@client/libs/hooks/table-processor';

import { createTableHeader, createTableRows } from './providers.data';

export const ProvidersTable: React.FC = () => {
  const settings = useTableProcessor(providersService.getAllProviders, {
    head: createTableHeader,
    rows: createTableRows,
    defaultSortKey: 'name',
  });

  return <DynamicTable {...settings} />;
};
