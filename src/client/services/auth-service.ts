import { machineIdSync } from 'node-machine-id'
import bcrypt from 'bcrypt'

import { IUser } from '@common/database/types/user'
import { configService } from './config-service'
import { usersService } from './users-service'

class AuthService {
  async authentication(): Promise<IUser | undefined> {
    const session = await configService.get<{
      userId: number
      machineId: string
    }>('session')
    const machineId = machineIdSync()

    if (!session || session.machineId !== machineId) {
      configService.delete('session')
      return
    }

    return usersService.getUserById(session.userId)
  }

  async authorize(
    userId: number,
    password: string,
    remember: boolean,
  ): Promise<IUser | undefined> {
    const user = await usersService.getUserWithPassById(userId)

    if (user && user.password && bcrypt.compareSync(password, user.password)) {
      if (remember) {
        await configService.set(
          'session',
          { userId: user.id, machineId: machineIdSync() },
          'json',
        )
      }

      return user
    }
  }

  async logout() {
    return configService.delete('session')
  }
}

export const authService = new AuthService()
