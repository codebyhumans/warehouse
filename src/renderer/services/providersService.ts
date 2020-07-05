import client from './prismaClient';

class ProvidersService {
  async getAllProviders() {
    return await client.provider.findMany();
  }
}

const providersService = new ProvidersService();

export default providersService;
