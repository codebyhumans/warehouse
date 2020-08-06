import React, { useState, Fragment, useRef } from 'react'
import {
  QuickSearch,
  ResultItemGroup,
  ObjectResult,
} from '@atlaskit/quick-search'
import { Search } from '@atlaskit/atlassian-navigation'
import debounce from 'lodash/debounce'
import styled from 'styled-components'
import Drawer from '@atlaskit/drawer'

import { categoriesService } from '@client/services/categories-service'
import { ICategory } from '@common/database/types/category'
import { IProduct } from '@common/database/types/product'
import { productsService } from '@client/services/products-service'

const Result = styled.div`
  padding-left: 8px;
`

export const SearchDrawer = () => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [products, setProducts] = useState<IProduct[]>([])
  const [isLoading, setLoading] = useState(false)
  const [isOpen, setOpen] = useState(false)

  const search = useRef(
    debounce(async (value: string) => {
      try {
        setLoading(true)

        const [categories, products] = await Promise.all([
          categoriesService.searchCategories(value, 5),
          productsService.searchProducts(value, 10),
        ])

        setCategories(categories)
        setProducts(products)
      } finally {
        setLoading(false)
      }
    }, 100),
  )

  const onSearch = (event: any) => {
    search.current(event.target.value)
  }

  const onClick = () => {
    setOpen(!isOpen)
  }

  const onClose = () => {
    setOpen(false)
  }

  const onCategoryClick = () => {
    // TODO: Open category in warehouse page
  }

  const onProductClick = () => {
    // TODO: Open product modal
  }

  return (
    <Fragment>
      <Search
        onClick={onClick}
        label="Поиск"
        placeholder="Поиск"
        tooltip={() => <div />}
      />
      <Drawer isOpen={isOpen} onClose={onClose} width="wide">
        <QuickSearch
          isLoading={isLoading}
          placeholder="Поиск"
          onSearchInput={onSearch}>
          <Result>
            <ResultItemGroup title="Категории">
              {categories.map(({ id, name }, idx) => (
                <ObjectResult
                  resultId={`category-${id}`}
                  key={idx}
                  name={name}
                  onClick={onCategoryClick}
                />
              ))}
            </ResultItemGroup>
            <ResultItemGroup title="Товары">
              {products.map(({ id, name, categoryName }, idx) => (
                <ObjectResult
                  resultId={`product-${id}`}
                  key={idx}
                  name={name}
                  containerName={categoryName}
                  onClick={onProductClick}
                />
              ))}
            </ResultItemGroup>
          </Result>
        </QuickSearch>
      </Drawer>
    </Fragment>
  )
}
