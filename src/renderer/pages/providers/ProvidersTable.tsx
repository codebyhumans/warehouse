import React from 'react';
import { Provider } from '@prisma/client';

import DynamicTable from '@atlaskit/dynamic-table';

import providersService from '../../services/providersService';

import { ISortFunctions, compareStrings } from '../../base/sortFunctions';
import { createTableHeader, createTableRows, ProviderKeys } from './providers.data';
import { useTableProcessor } from '../../base/useTableProcessor';

export const ProvidersTable: React.FC = () => {
  const settings = useTableProcessor(providersService.getAllProviders, {
    head: createTableHeader,
    rows: createTableRows,
    defaultSortKey: 'name',
  });

  return <DynamicTable {...settings} />;
};
