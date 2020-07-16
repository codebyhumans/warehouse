import React from 'react';
import styled from 'styled-components';
import { useTable, useBlockLayout, useResizeColumns, Column, useSortBy } from 'react-table';

interface ITable {
  onColumnResizeChange?: (columnResizing: any) => void;
  onSortByChange?: (sortBy: any) => void;
  columns: Column<any>[];
  defaultColumn?: {};
  initialState?: {};
  data: any[];
}

const Table: React.FC<ITable> = ({ initialState, defaultColumn, columns, data, ...options }) => {
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
    useResizeColumns,
    useBlockLayout,
    useSortBy,
  );

  React.useEffect(() => {
    if (options.onSortByChange) {
      options.onSortByChange(sortBy);
    }
  }, [sortBy]);

  React.useEffect(() => {
    if (options.onColumnResizeChange) {
      options.onColumnResizeChange(columnResizing);
    }
  }, [columnResizing]);

  return (
    <Wrapper {...getTableProps()}>
      <Header>
        {headerGroups.map((headerGroup) => (
          <Row {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <HeaderCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                {column.isSorted && <Sort desc={column.isSortedDesc} />}
                <Resizer {...column.getResizerProps()} isResizing={column.isResizing} />
              </HeaderCell>
            ))}
          </Row>
        ))}
      </Header>

      <Body {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <Row {...row.getRowProps()} className="tr">
              {row.cells.map((cell) => {
                return (
                  <Cell {...cell.getCellProps()} className="td">
                    {cell.render('Cell')}
                  </Cell>
                );
              })}
            </Row>
          );
        })}
      </Body>

      <Footer>
        {footerGroups.map((group) => (
          <Row {...group.getFooterGroupProps()}>
            {group.headers.map((column) => (
              <Cell {...column.getFooterProps()}>{column.render('Footer')}</Cell>
            ))}
          </Row>
        ))}
      </Footer>
    </Wrapper>
  );
};

/* border-top-color: ${(props) => props.isDesc && '#172B4D'}; */
/* border-bottom-color: ${(props) => !props.isDesc && '#172B4D'}; */

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  margin: 24px 0;
`;

const Header = styled.div`
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
`;

const Footer = styled.div`
  background: #eef0f2;
  border-top: 1px solid #e5e7eb;
`;

const Body = styled.div`
  flex: 1;
  overflow: auto;
`;

const Row = styled.div`
  :not(:last-child) {
    border-bottom: 1px solid #e5e7eb;
  }
`;

const Cell = styled.div`
  padding: 5px 15px;
  :not(:last-child) {
    border-right: 1px solid #e5e7eb;
  }
`;

const HeaderCell = styled(Cell)`
  padding: 10px 15px;
  font-weight: 500;
  font-size: 13px;
`;

const Sort = styled.div<{ readonly desc: boolean | undefined }>`
  position: relative;

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
    border-bottom: 3px solid rgb(223, 225, 230);
  }

  &:before {
    bottom: 0px;
    border-color: rgb(223, 225, 230) transparent transparent;
  }

  &:after {
    bottom: 8px;
    border-color: transparent transparent rgb(223, 225, 230);
  }
`;

const Resizer = styled.div<{ isResizing: boolean }>`
  width: 10px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  transform: translateX(50%);
  z-index: 1;
  touch-action: none;
`;

export default Table;
