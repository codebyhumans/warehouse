import { IProvider } from '@common/database/types/provider'
import { db } from '@common/database'

interface IProviderManageData extends Omit<IProvider, 'id'> {}

export default class ProvidersService {
  async getAllProviders(): Promise<IProvider[]> {
    return db<IProvider>('Provider').select('*')
  }

  async getProviderById(id: number): Promise<IProvider | undefined> {
    return db<IProvider>('Provider').where({ id }).first()
  }

  async createProvider(data: IProviderManageData) {
    return db<IProvider>('Provider').insert(data)
  }

  async deleteProviderById(id: number) {
    return db<IProvider>('Provider').where('id', id).delete()
  }

  async updateProvider(id: number, data: IProviderManageData) {
    return db<IProvider>('Provider').where('id', id).update(data)
  }
}

export const providersService = new ProvidersService()
