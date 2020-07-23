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

        const categories = await categoriesService.searchCategories(value, 5)
        setCategories(categories)
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
                  resultId={id}
                  key={idx}
                  name={name}
                  onClick={onCategoryClick}
                />
              ))}
            </ResultItemGroup>
          </Result>
        </QuickSearch>
      </Drawer>
    </Fragment>
  )
}
