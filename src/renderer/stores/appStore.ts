import { createContext, useContext } from 'react';

import { UsersStore, IUsersStore } from './usersStore';
import { IAuthenticationStore, AuthenticationStore } from './authenticationStore';

export interface IAppStore {
  usersStore: IUsersStore;
  authenticationStore: IAuthenticationStore;
}

export class AppStore implements IAppStore {
  usersStore = new UsersStore();
  authenticationStore = new AuthenticationStore(this.usersStore);
}

export const store = createContext({
  appStore: new AppStore(),
});

export const useStores = (): IAppStore => useContext(store).appStore;
