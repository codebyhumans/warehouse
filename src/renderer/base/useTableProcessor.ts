import { useState, useMemo, useEffect } from 'react';

import { HeadType, RowType } from '@atlaskit/dynamic-table/dist/cjs/types';

import { ISortFunctions } from './sortFunctions';

interface ITableProcessorOptions<T> {
  itemSortKey: string;
  sortFunctions: ISortFunctions<T>;
}

export function useTableProcessor<T>(
  loadData: () => Promise<T[]>,
  createHeader: () => HeadType,
  createRows: (items: T[]) => RowType[],
  options: ITableProcessorOptions<T>,
) {
  const [storedItems, setStoredItems] = useState<T[]>([]);
  const [sortOrder, setSortOrder] = useState<'DESC' | 'ASC'>('ASC');
  const [sortKey, setSortKey] = useState(options.itemSortKey);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData() {
    try {
      setIsLoading(true);
      const data = await loadData();
      setStoredItems(data);
    } catch (error) {
      //processError
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const items = useMemo(() => {
    const result = storedItems.sort(options.sortFunctions[sortKey]);

    if (sortOrder === 'DESC') {
      result.reverse();
    }

    return result;
  }, [storedItems, sortOrder, sortKey]);

  const onSort = (props: any) => {
    setSortKey(props.key);
    setSortOrder(props.sortOrder);
  };

  return {
    head: createHeader(),
    rows: createRows(items),
    defaultPage: 1,
    rowsPerPage: 20,
    isLoading,
    sortOrder,
    sortKey,
    onSort,
  };
}
