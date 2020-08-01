import { db } from '@common/database'
import { IRole } from '@common/database/types/role'

export interface IRoleManageData
  extends Omit<IRole, 'id' | 'createdAt' | 'updatedAt'> {}

class RolesService {
  async getRoleById(id: number): Promise<IRole | undefined> {
    return db<IRole>('role').where({ id }).first()
  }

  async getAllRoles(): Promise<IRole[]> {
    return db<IRole>('role').select('*')
  }

  async createRole(data: IRoleManageData) {
    return db<IRole>('role').insert(data)
  }

  async updateRole(id: number, data: IRoleManageData) {
    const role = await this.getRoleById(id)
    if (role?.system) return

    return db<IRole>('role').where({ id }).update(data)
  }

  async deleteRoleById(id: number) {
    const role = await this.getRoleById(id)
    if (role?.system) return

    return db<IRole>('role').where({ id }).delete()
  }
}

export const rolesService = new RolesService()
