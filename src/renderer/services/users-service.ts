import client from '@libs/prisma';

class UsersService {
  async getAllUsers() {
    return await client.user.findMany({});
  }
}

const usersService = new UsersService();

export default usersService;
