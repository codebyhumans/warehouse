import { createContext, useContext } from 'react';

export interface IAppStore {}

export const appStore = createContext({});

export const useStores = (): IAppStore => useContext(appStore);
