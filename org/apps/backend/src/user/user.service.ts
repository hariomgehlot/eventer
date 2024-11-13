import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}
  private user: any;
  get currentUser() {
    return this.currentUser;
  }
  set currentUser(user: any) {
    this.user = user;
  }

  async findUserByMobile(mobile: string) {
    console.log('VALIDATION', mobile);
    const find = await this.databaseService.user.findUnique({
      where: { mobile },
    });
    if (!find) {
      return null;
    }
    return find;
  }
  async createUser(mobile: string, password: string) {
    const createUser = await this.databaseService.user.create({
      data: {
        mobile,
        password,
      },
    });
    return createUser;
  }
}
