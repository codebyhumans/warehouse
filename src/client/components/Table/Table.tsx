import React, { useMemo } from 'react'
import styled from 'styled-components'
import {
  useTable,
  useBlockLayout,
  useResizeColumns,
  Column,
  useSortBy,
  Cell,
} from 'react-table'
import { colors } from '@atlaskit/theme'

interface ITable {
  onColumnResizeChange?: (columnResizing: any) => void
  onSortByChange?: (sortBy: any) => void
  columns: Column<any>[]
  defaultColumn?: {}
  initialState?: {}
  data: any[]
  onRowClick?: (data?: any) => void
  fluid?: boolean
}

const Table: React.FC<ITable> = ({
  initialState,
  defaultColumn,
  columns,
  data,
  ...options
}) => {
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
      defaultColumn,
      initialState,
      columns,
      data,
    },
    useBlockLayout,
    useResizeColumns,
    useSortBy,
  )

  React.useEffect(() => {
    if (options.onSortByChange) {
      options.onSortByChange(sortBy)
    }
  }, [sortBy])

  React.useEffect(() => {
    if (options.onColumnResizeChange) {
      options.onColumnResizeChange(columnResizing)
    }
  }, [columnResizing])

  const onCellClick = (event: React.MouseEvent, cell: Cell) => {
    if (event.target === event.currentTarget && options.onRowClick) {
      options.onRowClick(cell.row.original)
    }
  }

  return (
    <Wrapper {...getTableProps()}>
      <Container>
        {headerGroups.map((headerGroup) => (
          <Header>
            <Row {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Cell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="truncate">
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
          {rows.map((row) => {
            prepareRow(row)

            return (
              <BodyRow>
                <div {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <Cell {...cell.getCellProps()} className="truncate">
                      {cell.render('Cell')}
                    </Cell>
                  ))}
                </div>
              </BodyRow>
            )
          })}
        </Body>

        {/* Footer */}
        {footerGroups.map((group) => (
          <FooterRaw>
            <div {...group.getFooterGroupProps()}>
              {group.headers.map((column) => (
                <FooterCell {...column.getFooterProps()}>
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

const BodyRow = styled(Row)`
  border-bottom: 1px solid ${colors.N30};

  :nth-child(2n) {
    background: ${colors.N10};
  }
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

export default Table
