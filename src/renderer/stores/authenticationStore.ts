import { observable, action } from 'mobx';
import { User } from '@prisma/client';

import { IUsersStore } from './usersStore';

export interface IAuthenticationStore {
  currentUser?: User;
  signIn: (userId: number, password: string, remember: boolean) => void;
}

export class AuthenticationStore {
  private readonly usersStore: IUsersStore;

  constructor(usersStore: IUsersStore) {
    this.usersStore = usersStore;
  }

  @observable
  currentUser?: User;

  @action
  signIn = async (userId: number, password: string) => {
    const passwordHash = password;

    const user = this.usersStore.users.find((u) => u.id === userId && u.password === passwordHash);

    if (user) {
      this.currentUser = user;
    }
  };
}
