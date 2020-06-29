import { observable, action } from 'mobx';
import client from '../../../prismaClient';
import { User, Role } from '@prisma/client';

export interface IUsersStore {
  users: (User & { roles: Role[] })[];
  loadUsers: () => void;
}

export class UsersStore {
  @observable
  users: (User & { roles: Role[] })[] = [];

  @action
  loadUsers = async () => {
    try {
      const users = await client.user.findMany({
        include: {
          roles: true,
        },
      });

      this.users = users;
    } catch (error) {}
  };
}
