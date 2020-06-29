import { observable, action } from 'mobx';

export interface IAuthenticationStore {}

export class AuthenticationStore {
  @observable
  password: string = '';

  @action
  changePassword = (value: string) => {
    this.password = value;
  };
}
