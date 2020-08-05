import React from 'react'

import { useTableProcessor } from '@client/components/Table'
import { IProduct } from '@common/database/types/product'
import { productsService } from '@client/services/products-service'
import { Currency } from '@client/components/Currency'

export const useProductsTable = (categoryId: number) => {
  const tableProcessor = useTableProcessor<IProduct>(
    () => productsService.getProductsByCategory(categoryId),
    {
      name: 'products',
      columns: [
        {
          Header: 'Название',
          accessor: 'name',
        },
        {
          Header: 'Ед.изм',
          accessor: 'unitMeasure',
        },
        {
          Header: 'Кол-во',
          accessor: 'qty',
        },
        {
          Header: 'Закуп.стоимость',
          accessor: 'purchasePrice',
          Cell: ({ cell }) => <Currency value={cell.value} />,
        },
        {
          Header: 'Наценка',
          accessor: 'markup',
          Cell: ({ cell }) => `${cell.value}%`,
        },
        {
          Header: 'Цена',
          accessor: 'price',
          Cell: ({ cell }) => (
            <b>
              <Currency value={cell.value} />
            </b>
          ),
        },
        {
          Header: 'Сумма',
          accessor: 'id',
          Cell: ({ cell }) => (
            <Currency value={cell.row.original.price * cell.row.original.qty} />
          ),
        },
      ],
    },
  )

  return tableProcessor
}
