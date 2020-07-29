export interface IUser {
  id: number
  name: string
  roleId: number
  roleName: string
  permissions: number
  password?: string | null
  deletedAt?: Date | null
  createdAt?: Date
  updatedAt?: Date
}
