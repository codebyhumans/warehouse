import { observable, action } from 'mobx'

import { usersService } from '../services/users-service'
import { IUser } from '@common/database/types/user'

export interface IUsersStore {
  users: IUser[]
  loadUsers: () => void
}

export class UsersStore {
  constructor() {
    this.loadUsers()
  }

  @observable
  users: IUser[] = []

  @action
  loadUsers = async () => {
    console.log('load users')
    try {
      const users = await usersService.getAllUsers()
      console.log(users)
      this.users = users
    } catch (error) {
      console.log(error)
      //process error
    }
  }
}
