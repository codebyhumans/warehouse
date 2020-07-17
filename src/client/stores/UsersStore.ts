import { observable, action } from 'mobx';

import { usersService } from '../services/users-service';
import { IUser } from '@db/types/user';

export interface IUsersStore {
  users: IUser[];
  loadUsers: () => void;
}

export class UsersStore {
  constructor() {
    this.loadUsers();
  }

  @observable
  users: IUser[] = [];

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
