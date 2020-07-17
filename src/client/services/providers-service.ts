import { IProvider } from '@db/types/provider';
import { db } from '@db';

export default class ProvidersService {
  async getAllProviders(): Promise<IProvider[]> {
    return db<IProvider>('Provider').select('*');
  }

  async getProviderById(id: number): Promise<IProvider | undefined> {
    return db<IProvider>('Provider').where({ id }).first();
  }

  async addProvider(args: IProvider) {
    return db<IProvider>('Provider').insert(args);
  }

  async deleteProvider(id: number) {
    return db<IProvider>('Provider').where('id', id).delete();
  }

  async updateProvider(id: number, data: IProvider) {
    return db<IProvider>('Provider').where('id', id).update(data);
  }
}

export const providersService = new ProvidersService();
