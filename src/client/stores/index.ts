import { createContext, useContext } from 'react'

import { IUserStore, UserStore } from './UserStore'

export interface IAppStore {
  userStore: IUserStore
}

export class AppStore implements IAppStore {
  userStore = new UserStore()
}

export const store = createContext({
  appStore: new AppStore(),
})

export const useStores = (): IAppStore => useContext(store).appStore
