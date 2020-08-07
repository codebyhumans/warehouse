import React, { useMemo, useEffect } from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import {
  useTable,
  useBlockLayout,
  useResizeColumns,
  useSortBy,
  Column,
  Cell,
} from 'react-table'

import { localConfig } from '@common/local-config'
import { colors } from '@atlaskit/theme'

interface IProps<T extends Object> {
  onRowSelect?: (key: any) => void
  onRowClick?: (data: T) => void
  selectField?: string
  columns: Column<T>[]
  columnOptions?: {}
  selected?: any
  name: string
  data: T[]
}

const setTableState = (tableName: string, key: string, value: any) =>
  localConfig.set(`tables.${tableName}.${key}`, value)

const getTableInitialState = (tableName: string) => {
  const state: { [key: string]: any } = {}

  const tableConfig = localConfig.get(`tables.${tableName}`, {})

  if (tableConfig.sort) state.sortBy = tableConfig.sort
  if (tableConfig.sizes) state.columnResizing = tableConfig.sizes

  return state
}

const getColumnOptions = (options = {}) => {
  const defaultOptions = {
    maxWidth: 400,
    minWidth: 50,
  }

  return { ...defaultOptions, ...options }
}

export function Table<T extends Object>(props: IProps<T>) {
  const initialState = useMemo(() => getTableInitialState(props.name), [])
  const defaultColumn = useMemo(() => getColumnOptions(props.columnOptions), [])

  const {
    state: { sortBy, columnResizing },
    getTableBodyProps,
    getTableProps,
    footerGroups,
    headerGroups,
    prepareRow,
    rows,
  } = useTable(
    {
      columns: props.columns,
      data: props.data,
      defaultColumn,
      initialState,
    },
    useBlockLayout,
    useResizeColumns,
    useSortBy,
  )

  const selectedRowIndex = useMemo(() => {
    if (!props.selected || !props.data) return

    const selectedField = props.selectField || 'id'
    return rows.findIndex(
      (row) => row.original[selectedField] === props.selected,
    )
  }, [rows, props.selected])

  useEffect(() => {
    setTableState(props.name, 'sizes', columnResizing)
  }, [columnResizing])

  useEffect(() => {
    setTableState(props.name, 'sort', sortBy)
  }, [sortBy])

  const onCellClick = (event: React.MouseEvent, cell: Cell<T>) => {
    if (props.onRowSelect) {
      const selectedValue = cell.row.original.id

      if (selectedValue)
        props.onRowSelect(
          props.selected !== selectedValue ? selectedValue : null,
        )
    }

    if (props.onRowClick && event.target === event.currentTarget) {
      props.onRowClick(cell.row.original)
    }
  }

  return (
    <Wrapper {...getTableProps()}>
      <Container>
        {headerGroups.map((headerGroup, idx) => (
          <Header key={idx}>
            <Row {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, idx) => (
                <Cell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="truncate"
                  key={idx}>
                  {column.render('Header')}
                  {column.isSorted && <Sort isDesc={column.isSortedDesc} />}
                  {column.canResize && (
                    <Resizer
                      {...column.getResizerProps()}
                      isResizing={column.isResizing}
                    />
                  )}
                </Cell>
              ))}
            </Row>
          </Header>
        ))}

        {/* Body */}
        <Body {...getTableBodyProps()}>
          {rows.map((row, idx) => {
            prepareRow(row)

            return (
              <BodyRow key={idx} isSelected={idx === selectedRowIndex}>
                <div {...row.getRowProps()}>
                  {row.cells.map((cell, idx) => (
                    <Cell
                      {...cell.getCellProps()}
                      className="truncate"
                      onClick={(e) => onCellClick(e, cell)}
                      key={idx}>
                      {cell.render('Cell')}
                    </Cell>
                  ))}
                </div>
              </BodyRow>
            )
          })}
        </Body>

        {/* Footer */}
        {footerGroups.map((group, idx) => (
          <FooterRaw key={idx}>
            <div {...group.getFooterGroupProps()}>
              {group.headers.map((column, idx) => (
                <FooterCell {...column.getFooterProps()} key={idx}>
                  {column.render('Footer')}
                </FooterCell>
              ))}
            </div>
          </FooterRaw>
        ))}
      </Container>
    </Wrapper>
  )
}

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
  min-width: 100%;
`

const Wrapper = styled.div`
  overflow: auto;
  flex: 1;
`

const Body = styled.div`
  overflow: auto;
  flex: 1;
`

const Row = styled.div`
  padding-right: 30px;
  padding-left: 30px;
`

const BodyRow = styled(Row)<{ isSelected: boolean }>`
  border-bottom: 1px solid ${colors.N30};
  cursor: pointer;

  background: ${(props) => props.isSelected && colors.linkHover};
  color: ${(props) => props.isSelected && 'white'};
`

const FooterRaw = styled(Row)`
  border-top: 1px solid ${colors.N30};
  background: ${colors.N20};
  margin-top: -1px;
`

const FooterCell = styled.div`
  padding: 2px 10px;
`

const Header = styled.div`
  border-bottom: 1px solid ${colors.N30};
  background: ${colors.N20};
  font-weight: 500;
  font-size: 13px;
  min-width: 100%;
`

const Cell = styled.div`
  padding: 5px 10px;

  :not(:last-child) {
    border-right: 1px solid ${colors.N30};
  }
`

const Sort = styled.div<{ isDesc?: boolean }>`
  position: relative;
  margin-right: 5px;
  margin-left: 3px;

  &:before,
  &:after {
    display: block;
    height: 0px;
    position: absolute;
    right: -8px;
    width: 0px;
    content: '';
    border-width: 3px;
    border-style: solid;
    border-image: initial;
    border-bottom: 3px solid ${colors.N80};
  }

  &:before {
    bottom: 0px;
    border-color: ${colors.N80} transparent transparent;
    border-top-color: ${(props) => props.isDesc && colors.N800};
  }

  &:after {
    bottom: 8px;
    border-color: transparent transparent ${colors.N80};
    border-bottom-color: ${(props) => !props.isDesc && colors.N800};
  }
`

const Resizer = styled.div<{ isResizing: boolean }>`
  height: 100%;
  width: 10px;

  transform: translateX(50%);
  position: absolute;
  z-index: 1;
  right: 0;
  top: 0;

  background: ${(props) => props.isResizing && colors.N600};

  :hover {
    background: ${colors.N600};
  }
`
