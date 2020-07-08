import { observable, action, computed } from 'mobx';
import { authService } from '@client/services/auth-service';
import { User } from '@prisma/client';

export interface IUserStore {
  signIn: (userId: number, password: string, remember: boolean) => Promise<Boolean>;
  authentication: () => any;
  isAuthorized: boolean;
  loadedUser?: boolean;
  currentUser?: User;
}

export class UserStore implements IUserStore {
  @observable
  currentUser?: User;

  @computed
  get isAuthorized() {
    return !!this.currentUser;
  }

  @action
  authentication = async () => {
    try {
      const user = await authService.authentication();
      if (user) this.currentUser = user;
    } catch (error) {
      console.log(error);
    }
  };

  @action
  signIn = async (userId: number, password: string, remember: boolean): Promise<boolean> => {
    const user = await authService.authorize(userId, password, remember);
    if (user) this.currentUser = user;

    return !!user;
  };
}
