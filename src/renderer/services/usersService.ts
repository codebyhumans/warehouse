import client from './prismaClient';
import { User } from '@prisma/client';

class UsersService {
  async getAllUsers() {
    return await client.user.findMany();
  }
}

const usersService = new UsersService();

export default usersService;
