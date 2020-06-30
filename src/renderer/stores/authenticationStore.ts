import { observable, action } from 'mobx';
import { User } from '@prisma/client';
//import bcrypt from 'bcrypt';

import { IUsersStore } from './usersStore';

export interface IAuthenticationStore {
  password: string;
  changePassword: (value: string) => void;
}

export class AuthenticationStore {
  private readonly usersStore: IUsersStore;

  constructor(usersStore: IUsersStore) {
    this.usersStore = usersStore;
  }

  @observable
  currentUser?: User;

  @observable
  password: string = '';

  @action
  changePassword = (value: string) => {
    this.password = value;
  };

  @action
  signIn = async () => {
    const passwordHash = 'await bcrypt.hash(this.password, 10);';

    const user = this.usersStore.users.find((u) => u.password === passwordHash);

    if (user) {
      this.currentUser = user;
    }
  };
}
