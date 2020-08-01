import { observable, action, computed } from 'mobx'
import { authService } from '@client/services/auth-service'
import { IUser } from '@common/database/types/user'

export interface IUserStore {
  signIn: (
    userId: number,
    password: string,
    remember: boolean,
  ) => Promise<Boolean>
  authentication: () => any
  logout: () => any
  isCurrentUser: (id: number) => boolean
  isAuthorized: boolean
  loadedUser?: boolean
  currentUser?: IUser
}

export class UserStore implements IUserStore {
  @observable
  currentUser?: IUser

  @computed
  get isAuthorized() {
    return !!this.currentUser
  }

  @action
  authentication = async () => {
    try {
      const user = await authService.authentication()
      console.log(user)
      if (user) this.currentUser = user
    } catch (error) {
      console.error(error)
    }
  }

  isCurrentUser = (id: number): boolean => {
    return this.currentUser?.id === id
  }

  @action
  signIn = async (
    userId: number,
    password: string,
    remember: boolean,
  ): Promise<boolean> => {
    const user = await authService.authorize(userId, password, remember)

    if (user) {
      delete user.password
      this.currentUser = user
    }

    return !!user
  }

  @action
  logout = async () => {
    await authService.logout()
    this.currentUser = undefined
  }
}
