import { observable, action } from 'mobx';
import client from '../../../prismaClient';
import { User } from '@prisma/client';

export interface IUsersStore {
  users: User[];
  loadUsers: () => void;
}

export class UsersStore {
  @observable
  users: User[] = [];

  @action
  loadUsers = async () => {
    try {
      const users = await client.user.findMany();

      this.users = users;
    } catch (error) {}
  };
}
