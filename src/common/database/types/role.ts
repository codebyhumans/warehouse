export interface IRole {
  id: number
  name: string
  permissions: number
  system: boolean
  createdAt?: Date
  updatedAt?: Date
}
