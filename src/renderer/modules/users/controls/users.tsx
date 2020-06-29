import React, { useEffect } from 'react';

import { observer } from 'mobx-react-lite';

import { useStores } from '../../../appStore';

export const Users: React.FC = observer(() => {
  const { users, loadUsers } = useStores().usersStore;

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      Users:
      {users.map((u) => (
        <div>
          {u.id}
          {u.name}
          {u.email}
        </div>
      ))}
    </div>
  );
});
