import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { operationsService } from '@client/services/operations-service'
import EditorSuccessIcon from '@atlaskit/icon/glyph/editor/success'
import { colors } from '@atlaskit/theme'

import { IOperation, IOperationType } from '@common/database/types/operation'
import { Table } from '@client/components/Table'
import { Currency } from '@client/components/Currency'
import { Date } from '@client/components/Date'

interface IProps {
  productId: number
}

export const OperationsTable: React.FC<IProps> = (props) => {
  const [data, setData] = useState<IOperation[]>([])

  const loadData = async () => {
    const operations = await operationsService.getOperationsByProduct(
      props.productId,
    )
    setData(operations)
  }

  useEffect(() => {
    loadData()
  }, [props.productId])

  return (
    <Table<IOperation>
      name="operations"
      data={data}
      columns={[
        {
          Header: 'Документ',
          accessor: 'number',
        },
        {
          Header: 'Тип',
          accessor: 'type',
          Cell: ({ cell }) => (
            <CellName>
              {operationsService.getOperationTypeProperty(cell.value)}
              {cell.value === IOperationType.ARRIVAL &&
              cell.row.original.consider ? (
                <CellNameIcon>
                  <EditorSuccessIcon
                    primaryColor={colors.G300}
                    label="same-user"
                    size="small"
                  />
                </CellNameIcon>
              ) : (
                ''
              )}
            </CellName>
          ),
        },
        {
          Header: 'Цена',
          accessor: 'price',
          Cell: ({ cell }) => cell.value && <Currency value={cell.value} />,
        },
        {
          Header: 'Кол-во',
          accessor: 'qty',
        },
        {
          Header: 'Поставщик',
          accessor: 'providerName',
        },
        {
          Header: 'Дата',
          accessor: 'createdAt',
          Cell: ({ cell }) => <Date value={cell.value} />,
        },
      ]}
    />
  )
}

const CellName = styled.div`
  display: flex;
  align-items: center;
`

const CellNameIcon = styled.div`
  margin-left: 5px;
`
