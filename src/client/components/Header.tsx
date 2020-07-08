import React from 'react';
import { AtlassianLogo, AtlassianIcon } from '@atlaskit/logo';
import { AtlassianNavigation, ProductHome, PrimaryButton } from '@atlaskit/atlassian-navigation';

import { SearchDrawer } from './SearchDrawer';
import { useHistory } from 'react-router';

const ProductHomeExample = () => <ProductHome icon={AtlassianIcon} logo={AtlassianLogo} />;

export const Header = () => {
  const history = useHistory();

  return (
    <AtlassianNavigation
      label="site"
      primaryItems={[
        <PrimaryButton>Склад</PrimaryButton>,
        <PrimaryButton onClick={() => history.push('/users')}>Пользователи</PrimaryButton>,
        <PrimaryButton onClick={() => history.push('/providers')}>Поставщики</PrimaryButton>,
        <PrimaryButton onClick={() => history.push('/units')}>Ед.измерения</PrimaryButton>,
      ]}
      renderSearch={SearchDrawer}
      renderProductHome={ProductHomeExample}
    />
  );
};
