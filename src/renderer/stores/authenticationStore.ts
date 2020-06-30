import { observable, action } from 'mobx';
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
  password: string = '';

  @action
  changePassword = (value: string) => {
    this.password = value;
  };

  @action
  signIn = () => {};
}
