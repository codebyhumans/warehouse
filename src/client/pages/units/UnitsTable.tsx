import React from 'react';
import DynamicTable from '@atlaskit/dynamic-table';
import { unitsService } from '@client/services/units-service';
import { useTableProcessor } from '@client/libs/hooks/table-processor';

import { createTableHeader, createTableRows } from './units.data';

export const UnitsTable: React.FC = () => {
  const settings = useTableProcessor(unitsService.getAllUnits, {
    head: createTableHeader,
    rows: createTableRows,
    defaultSortKey: 'name',
  });

  return <DynamicTable {...settings} />;
};
