import { IProvider } from '@db/types/provider';
import { db } from '@db';

export default class ProvidersService {
  async getAllProviders(): Promise<IProvider[]> {
    return db<IProvider>('Provider').select('*');
  }

  async getProviderById(id: number): Promise<IProvider | undefined> {
    return db<IProvider>('Provider').where({ id }).first();
  }
}

export const providersService = new ProvidersService();
