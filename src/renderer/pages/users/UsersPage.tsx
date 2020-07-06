import React from 'react';
import { observer } from 'mobx-react-lite';
import PageHeader from '@atlaskit/page-header';
import Button, { ButtonGroup } from '@atlaskit/button';

import { Container } from '../../theme/grid';
import { useStores } from '../../stores/AppStore';

const actionsContent = (
  <ButtonGroup>
    <Button appearance="primary">Добавить пользователя</Button>
  </ButtonGroup>
);

export const UsersPage: React.FC = observer(() => {
  const { users } = useStores().usersStore;

  return (
    <Container>
      <PageHeader actions={actionsContent}>Пользователи</PageHeader>
      {users.map((u) => (
        <div>
          {u.id}
          {u.name}
        </div>
      ))}
    </Container>
  );
});
