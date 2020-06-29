import { createContext, useContext } from 'react';

import { UsersStore, IUsersStore } from './modules/users/stores/usersStore';
import { IAuthenticationStore, AuthenticationStore } from './modules/authentication/stores/authenticationStore';

export interface IAppStore {
  authenticationStore: IAuthenticationStore;
  usersStore: IUsersStore;
}

export const appStore = createContext({
  authenticationStore: new AuthenticationStore(),
  usersStore: new UsersStore(),
});

export const useStores = (): IAppStore => useContext(appStore);
