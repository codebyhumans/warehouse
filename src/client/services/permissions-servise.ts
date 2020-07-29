export enum Permission {
  ALL = 0,
  USERS_VIEW = 1,
  USERS_MANAGE = 2,
  PROVIDERS_VIEW = 4,
  PROVIDERS_MANAGE = 8,
}

export const PermissionProperties = {
  [Permission.ALL]: 'Все права',
  [Permission.USERS_VIEW]: 'Просмотр пользователей',
  [Permission.USERS_MANAGE]: 'Управление пользователями',
  [Permission.PROVIDERS_VIEW]: 'Просмотр поставщиков',
  [Permission.PROVIDERS_MANAGE]: 'Управление поставщиками',
}

export type PermissionStack = number | undefined | null

export default class PermissionsService {
  private get fullStack() {
    return Object.keys(PermissionProperties).reduce(
      (count, permission) => (count += +permission),
      0,
    )
  }

  public checkPermission(
    stack: PermissionStack,
    permission: Permission,
  ): boolean {
    if (stack === null || stack === undefined) return false

    if (permission === Permission.ALL) {
      return stack === Permission.ALL
    }

    return stack === Permission.ALL || (stack & permission) === permission
  }

  public addPermission(
    permission: Permission,
    stack?: PermissionStack,
  ): PermissionStack {
    const newStack = (stack || 0) + permission

    return newStack === this.fullStack ? Permission.ALL : newStack
  }

  public deletePermission(
    stack: number,
    permission: Permission,
  ): PermissionStack {
    const newStack =
      (stack === Permission.ALL ? this.fullStack : stack) - permission

    return newStack === Permission.ALL ? null : newStack
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
