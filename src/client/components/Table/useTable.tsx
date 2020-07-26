import { useState, useEffect, useMemo } from 'react'
import { Column } from 'react-table'
import { localConfig } from '@common/local-config'

interface ITableProcessorOptions<T extends object> {
  name: string
  columns: Column<T>[]
  columnOptions?: {}
  onRowClick: (data: T) => void
}

const getInitialState = (tableName: string) => {
  const state: { [key: string]: any } = {}

  const tableConfig = localConfig.get(`tables.${tableName}`, {})

  if (tableConfig.sort) state.sortBy = tableConfig.sort
  if (tableConfig.sizes) state.columnResizing = tableConfig.sizes

  return state
}

const getColumnOptions = (options = {}) => {
  const defaultOptions = {
    maxWidth: 600,
    minWidth: 30,
  }

  return { ...defaultOptions, ...options }
}

export default function <T extends object>(
  data: (args?: any) => Promise<T[]> | T[],
  options: ITableProcessorOptions<T>,
) {
  const [isLoading, setLoading] = useState(false)
  const [tableData, setTableData] = useState<T[]>([])

  const initialState = useMemo(() => getInitialState(options.name), [])
  const defaultColumn = useMemo(
    () => getColumnOptions(options.columnOptions),
    [],
  )

  const columns = options.columns

  const fetchData = async () => {
    if (typeof data !== 'function') {
      return setTableData(data)
    }

    try {
      setLoading(true)
      setTableData(await data())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onColumnResizeChange = (sizes: any) => {
    localConfig.set(`tables.${options.name}.sizes`, sizes)
  }

  const onSortByChange = (sort: any) => {
    localConfig.set(`tables.${options.name}.sort`, sort)
  }

  return {
    refresh: fetchData,
    settings: {
      onRowClick: options.onRowClick,
      onColumnResizeChange,
      data: tableData,
      onSortByChange,
      defaultColumn,
      initialState,
      isLoading,
      columns,
    },
  }
}
