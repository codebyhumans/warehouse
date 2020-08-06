import React, { useState, useEffect } from 'react'

import { productsService } from '@client/services/products-service'
import { IProduct } from '@common/database/types/product'
import { Currency } from '@client/components/Currency'
import { Table } from '@client/components/Table'

interface IProps {
  categoryId: number
}

export const ProductsTable: React.FC<IProps> = (props) => {
  const [data, setData] = useState<IProduct[]>([])

  const loadData = async () => {
    const operations = await productsService.getProductsByCategory(
      props.categoryId,
    )
    setData(operations)
  }

  useEffect(() => {
    loadData()
  }, [props.categoryId])

  return (
    <Table<IProduct>
      name="products"
      data={data}
      columns={[
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
      ]}
    />
  )
}
