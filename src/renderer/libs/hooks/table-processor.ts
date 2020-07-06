import { useState, useMemo, useEffect } from 'react';
import { HeadType, RowType } from '@atlaskit/dynamic-table/dist/cjs/types';

type SortOrderType = 'ASC' | 'DESC';

interface ITableProcessorOptions<T> {
  rows: (items: T[]) => RowType[];
  head: () => HeadType;
  defaultSortKey?: string;
  defaultSortOrder?: SortOrderType;
}

export function useTableProcessor<T>(load: (args?: any) => Promise<T[]>, options: ITableProcessorOptions<T>) {
  const [sortOrder, setSortOrder] = useState<SortOrderType>(options.defaultSortOrder || 'ASC');
  const [sortKey, setSortKey] = useState<string>(options.defaultSortKey || 'id');
  const [isLoading, setLoading] = useState(false);
  const [rows, setRows] = useState<T[]>([]);

  const orderBy = useMemo(() => ({ [sortKey]: sortOrder.toLowerCase() }), [sortOrder, sortKey]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const data = await load({
        orderBy,
      });
      setRows(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [orderBy]);

  const onSort = (props: any) => {
    setSortOrder(props.sortOrder);
    setSortKey(props.key);

    console.log(props);
  };

  return {
    rows: options.rows(rows),
    head: options.head(),
    isLoading,
    sortOrder,
    sortKey,
    onSort,
  };
}
