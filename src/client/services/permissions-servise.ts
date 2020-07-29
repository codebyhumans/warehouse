export enum Permission {
  ALL = 1,
  USERS_VIEW = 2,
  USERS_MANAGE = 4,
  PROVIDERS_VIEW = 8,
  PROVIDERS_MANAGE = 16,
}

export const PermissionProperties = {
  [Permission.ALL]: 'Все права',
  [Permission.USERS_VIEW]: 'Просмотр пользователей',
  [Permission.USERS_MANAGE]: 'Управление пользователями',
  [Permission.PROVIDERS_VIEW]: 'Просмотр поставщиков',
  [Permission.PROVIDERS_MANAGE]: 'Управление поставщиками',
}

export type PermissionStack = number

export default class PermissionsService {
  private get fullStack() {
    return Object.keys(PermissionProperties).reduce((count, permission) => {
      if (+permission !== Permission.ALL) {
        count += +permission
      }

      return count
    }, 0)
  }

  public checkPermission(
    stack: PermissionStack,
    permission: Permission,
  ): boolean {
    if (permission === Permission.ALL) {
      return stack === Permission.ALL
    }

    return stack === Permission.ALL || (stack & permission) === permission
  }

  public addPermission(
    permission: Permission,
    stack: PermissionStack,
  ): PermissionStack {
    if (permission === Permission.ALL) {
      return Permission.ALL
    }

    return stack + permission
  }

  public deletePermission(
    stack: PermissionStack,
    permission: Permission,
  ): PermissionStack {
    if (permission === Permission.ALL) return this.fullStack
    return (stack === Permission.ALL ? this.fullStack : stack) - permission
  }

  public getCountPermissions(stack: number): number {
    return Object.keys(PermissionProperties).reduce(
      (count, permission) =>
        (count += this.checkPermission(stack, +permission) ? 1 : 0),
      0,
    )
  }
}

export const permissionsService = new PermissionsService()
