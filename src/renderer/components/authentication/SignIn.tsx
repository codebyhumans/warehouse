import React from 'react';

import { observer } from 'mobx-react-lite';

import DropdownMenu, { DropdownItemGroup, DropdownItem } from '@atlaskit/dropdown-menu';

import { useStores } from '../../stores/appStore';

export const SignIn: React.FC = observer(() => {
  const {
    usersStore: { users },
  } = useStores();

  return (
    <div>
      <DropdownMenu trigger="Choices" triggerType="button">
        <DropdownItemGroup>
          {users.map((u) => (
            <DropdownItem>{u.name}</DropdownItem>
          ))}
        </DropdownItemGroup>
      </DropdownMenu>
    </div>
  );
});
