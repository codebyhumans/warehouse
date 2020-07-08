import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { prisma } from '@client/libs/prisma';

class UsersService {
  async createUser(name: string, pass: string): Promise<User> {
    const password = bcrypt.hashSync(pass, 10);

    return prisma.user.create({
      data: {
        name,
        password,
      },
    });
  }

  async getUserById(id: number): Promise<User | null> {
    return prisma.user.findOne({
      where: {
        id,
      },
    });
  }

  async getAllUsers() {
    return prisma.user.findMany({});
  }
}

export const usersService = new UsersService();
