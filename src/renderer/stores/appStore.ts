import { createContext, useContext } from 'react';

import { UsersStore, IUsersStore } from './usersStore';
import { IAuthenticationStore, AuthenticationStore } from './authenticationStore';
import { ProvidersStore, IProvidersStore } from './providersStore';

export interface IAppStore {
  usersStore: IUsersStore;
  authenticationStore: IAuthenticationStore;
  providersStore: IProvidersStore;
}

export class AppStore implements IAppStore {
  usersStore = new UsersStore();
  authenticationStore = new AuthenticationStore(this.usersStore);
  providersStore = new ProvidersStore();
}

export const store = createContext({
  appStore: new AppStore(),
});

export const useStores = (): IAppStore => useContext(store).appStore;
