import React from 'react';
import { Provider } from '@prisma/client';

import DynamicTable from '@atlaskit/dynamic-table';

import providersService from '../../services/providersService';

import { ISortFunctions, compareStrings } from '../../base/sortFunctions';
import { createTableHeader, createTableRows, ProviderKeys } from './providers.data';
import { useTableProcessor } from '../../base/useTableProcessor';

const sortFunctions: ISortFunctions<Provider> = {
  [ProviderKeys.Name]: (a, b) => compareStrings(a.name.toLocaleLowerCase(), b.name.toLocaleLowerCase()),
};

export const ProvidersTable: React.FC = () => {
  const settings = useTableProcessor(providersService.getAllProviders, createTableHeader, createTableRows, {
    itemSortKey: ProviderKeys.Name,
    sortFunctions,
  });

  return <DynamicTable {...settings} />;
};
