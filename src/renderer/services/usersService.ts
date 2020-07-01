import client from './prismaClient';

class UsersService {
  async getAllUsers() {
    return await client.user.findMany({});
  }
}

const usersService = new UsersService();

export default usersService;
