import { observable, action } from 'mobx';
import usersService from '../services/UsersService';
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
      const users = await usersService.getAllUsers();
      this.users = users;
    } catch (error) {
      //process error
    }
  };
}
