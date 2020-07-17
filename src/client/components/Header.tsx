import React from 'react';
import { AtlassianLogo, AtlassianIcon } from '@atlaskit/logo';
import { AtlassianNavigation, ProductHome, PrimaryButton } from '@atlaskit/atlassian-navigation';

import { SearchDrawer } from './SearchDrawer';
import { useHistory, useLocation } from 'react-router';

const ProductHomeExample = () => <ProductHome icon={AtlassianIcon} logo={AtlassianLogo} />;

export const Header = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  return (
    <AtlassianNavigation
      label="site"
      primaryItems={[
        <PrimaryButton>Склад</PrimaryButton>,
        <PrimaryButton isHighlighted={pathname === '/users'} onClick={() => history.push('/users')}>Пользователи</PrimaryButton>,
        <PrimaryButton isHighlighted={pathname === '/providers'} onClick={() => history.push('/providers')}>Поставщики</PrimaryButton>,
        <PrimaryButton isHighlighted={pathname === '/units'} onClick={() => history.push('/units')}>Ед.измерения</PrimaryButton>,
      ]}
      renderSearch={SearchDrawer}
      renderProductHome={ProductHomeExample}
    />
  );
};
