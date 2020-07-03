import { observable, action } from 'mobx';
import { User } from '@prisma/client';

import { IUsersStore } from './usersStore';

export interface IAuthenticationStore {
  currentUser?: User;
  signIn: (userId: number, password: string, remember: boolean) => boolean;
}

export class AuthenticationStore implements IAuthenticationStore {
  private readonly usersStore: IUsersStore;

  constructor(usersStore: IUsersStore) {
    this.usersStore = usersStore;
  }

  @observable
  currentUser?: User;

  @action
  signIn = (userId: number, password: string, remember: boolean) => {
    const passwordHash = password;

    const user = this.usersStore.users.find((u) => u.id === userId && u.password === passwordHash);

    if (!user) {
      return false;
    }

    this.currentUser = user;

    if (remember) {
      //save
    }

    return true;
  };
}
