import { FindManyProviderArgs } from '@prisma/client';
import { prisma } from '@client/libs/prisma';

export default class ProvidersService {
  async getAllProviders(options?: FindManyProviderArgs) {
    return prisma.provider.findMany(options);
  }

  async getProviderById(id: number) {
    return prisma.provider.findOne({
      where: { id },
    });
  }
}

export const providersService = new ProvidersService();
