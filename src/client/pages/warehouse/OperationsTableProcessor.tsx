import React from 'react'

import { operationsService } from '@client/services/operations-service'
import { IOperation, IOperationType } from '@common/database/types/operation'
import EditorSuccessIcon from '@atlaskit/icon/glyph/editor/success'
import { useTableProcessor } from '@client/components/Table'
import { Date } from '@client/components/Date'
import { Currency } from '@client/components/Currency'
import styled from 'styled-components'
import { colors } from '@atlaskit/theme'

export const useOperationsTable = (productId: number) => {
  const tableProcessor = useTableProcessor<IOperation>(
    () => operationsService.getOperationsByProduct(productId),
    {
      name: 'operations',
      columns: [
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
      ],
    },
  )

  return tableProcessor
}

const CellName = styled.div`
  display: flex;
  align-items: center;
`

const CellNameIcon = styled.div`
  margin-left: 5px;
`
