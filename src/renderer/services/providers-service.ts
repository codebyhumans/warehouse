import { FindManyProviderArgs } from '@prisma/client';
import client from '@libs/prisma';

export default class ProvidersService {
  async getAllProviders(options: FindManyProviderArgs) {
    return client.provider.findMany(options);
  }
}

export const providersService = new ProvidersService();
