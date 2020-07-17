import { createContext, useContext } from 'react';

import { UsersStore, IUsersStore } from './usersStore';
import { IUserStore, UserStore } from './UserStore';

export interface IAppStore {
  usersStore: IUsersStore;
  userStore: IUserStore;
}

export class AppStore implements IAppStore {
  usersStore = new UsersStore();
  userStore = new UserStore();
}

export const store = createContext({
  appStore: new AppStore(),
});

export const useStores = (): IAppStore => useContext(store).appStore;
