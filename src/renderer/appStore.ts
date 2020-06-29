import { createContext, useContext } from 'react';

import { UsersStore, IUsersStore } from './modules/users/stores/usersStore';

export interface IAppStore {
  usersStore: IUsersStore;
}

export const appStore = createContext({
  usersStore: new UsersStore(),
});

export const useStores = (): IAppStore => useContext(appStore);
