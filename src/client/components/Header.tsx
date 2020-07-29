import React from 'react'
import { AtlassianLogo, AtlassianIcon } from '@atlaskit/logo'
import {
  AtlassianNavigation,
  ProductHome,
  PrimaryButton,
} from '@atlaskit/atlassian-navigation'

import { HeaderProfile } from './HeaderProfile'

import { SearchDrawer } from './SearchDrawer'
import { useHistory, useLocation } from 'react-router'

const ProductHomeExample = () => (
  <ProductHome icon={AtlassianIcon} logo={AtlassianLogo} />
)

export const Header = () => {
  const { push } = useHistory()
  const { pathname } = useLocation()

  return (
    <AtlassianNavigation
      label="site"
      primaryItems={[
        <PrimaryButton
          isHighlighted={pathname === '/warehouse'}
          onClick={() => push('/warehouse')}>
          Склад
        </PrimaryButton>,
        <PrimaryButton
          isHighlighted={pathname === '/users'}
          onClick={() => push('/users')}>
          Пользователи
        </PrimaryButton>,
        <PrimaryButton
          isHighlighted={pathname === '/roles'}
          onClick={() => push('/roles')}>
          Роли
        </PrimaryButton>,
        <PrimaryButton
          isHighlighted={pathname === '/providers'}
          onClick={() => push('/providers')}>
          Поставщики
        </PrimaryButton>,
        <PrimaryButton
          isHighlighted={pathname === '/units'}
          onClick={() => push('/units')}>
          Ед.измерения
        </PrimaryButton>,
      ]}
      renderSearch={SearchDrawer}
      renderProductHome={ProductHomeExample}
      renderProfile={HeaderProfile}
    />
  )
}
