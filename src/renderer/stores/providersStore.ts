import { observable, action, computed } from 'mobx';
import { Provider } from '@prisma/client';

import providersService from '../services/providersService';
import { ISortFunctions, compareStrings } from '../base/sortFunctions';

export enum ProviderKeys {
  Name = 'name',
  Address = 'address',
  Phone = 'phone',
  Email = 'email',
  BankName = 'bankName',
  BankAddress = 'bankAddress',
  BankMfo = 'bankMfo',
  BankExpense = 'bankExpense',
}

const sortFunctions: ISortFunctions<Provider> = {
  [ProviderKeys.Name]: (a, b) => compareStrings(a.name.toLocaleLowerCase(), b.name.toLocaleLowerCase()),
};

export interface IProvidersStore {
  providers: Provider[];
  sortOrder: 'DESC' | 'ASC';
  sortKey: ProviderKeys;
  setSortParams: (key: ProviderKeys, order: 'DESC' | 'ASC') => void;
  loadProviders: () => void;
}

export class ProvidersStore implements IProvidersStore {
  @observable
  private storedProviders: Provider[] = [];

  @computed
  get providers() {
    const result = this.storedProviders.sort(sortFunctions[this.sortKey]);

    if (this.sortOrder === 'DESC') {
      result.reverse();
    }

    return result;
  }

  @observable
  sortOrder: 'DESC' | 'ASC' = 'ASC';

  @observable
  sortKey: ProviderKeys = ProviderKeys.Name;

  @action
  setSortParams = (key: ProviderKeys, order: 'DESC' | 'ASC') => {
    this.sortKey = key;
    this.sortOrder = order;
  };

  @action
  loadProviders = async () => {
    try {
      const providers = await providersService.getAllProviders();
      console.log(providers.length);
      this.storedProviders = providers;
    } catch (error) {
      //processError
    }
  };
}
