import { observable, action } from 'mobx';
import { User } from '@prisma/client';

import { usersService } from '../services/users-service';

export interface IUsersStore {
  users: User[];
  loadUsers: () => void;
}

export class UsersStore {
  constructor() {
    this.loadUsers();
  }

  @observable
  users: User[] = [];

  @action
  loadUsers = async () => {
    try {
      const users = await usersService.getAllUsers();
      this.users = users;
    } catch (error) {
      //process error
    }
  };
}
