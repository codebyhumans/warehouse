import bcrypt from 'bcrypt';
import { IUser } from '@common/database/types/user';
import { db } from '@common/database';

class UsersService {
  async createUser(name: string, pass: string): Promise<IUser> {
    const password = bcrypt.hashSync(pass, 10);
    return db<IUser>('User').insert({ name, password });
  }

  async getUserById(id: number): Promise<IUser | undefined> {
    return db<IUser>('User').where({ id }).first();
  }

  async getAllUsers(): Promise<IUser[]> {
    return db<IUser>('User').select('*');
  }
}

export const usersService = new UsersService();
