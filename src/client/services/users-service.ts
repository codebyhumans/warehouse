import bcrypt from 'bcrypt'
import { IUser } from '@common/database/types/user'
import { db } from '@common/database'
import { IRole } from '@common/database/types/role'

interface IUserCreateData
  extends Omit<IUser, 'id' | 'passowrd' | 'permissions' | 'roleName'> {
  password: string
}

interface IUserUpdateData
  extends Omit<IUser, 'id' | 'passowrd' | 'permissions' | 'roleName'> {}

class UsersService {
  private baseFields = [
    'user.id',
    'user.name',
    'user.roleId',
    'role.name as roleName',
    'role.permissions',
    'user.createdAt',
    'user.updatedAt',
  ]

  async getUserById(id: number): Promise<IUser | undefined> {
    return db<IUser>('user')
      .join('role', 'user.roleId', '=', 'role.id')
      .where({ 'user.id': id, 'user.deletedAt': null })
      .select(this.baseFields)
      .first()
  }

  async getUserWithPassById(id: number): Promise<IUser> {
    return db<IUser>('user')
      .join('role', 'user.roleId', '=', 'role.id')
      .where({ 'user.id': id, 'user.deletedAt': null })
      .select([...this.baseFields, 'user.password'])
      .first()
  }

  async getAllUsers(): Promise<IUser[]> {
    return db<IUser>('user')
      .where({ deletedAt: null })
      .join('role', 'user.roleId', '=', 'role.id')
      .select(this.baseFields)
  }

  async createUser(data: IUserCreateData) {
    return db<IUser>('user').insert({
      ...data,
      password: bcrypt.hashSync(data.password, 12),
    })
  }

  async updateUser(id: number, data: IUserUpdateData): Promise<number> {
    return db<IUser>('user').where({ id }).update(data)
  }

  async removeUserById(id: number) {
    return db<IUser>('user')
      .where({ id })
      .update({ deletedAt: db.fn.now() })
      .catch((error) => console.log(error))
  }
}

export const usersService = new UsersService()
