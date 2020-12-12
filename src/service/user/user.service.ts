import { Injectable } from '@nestjs/common';
import { UserDao } from '../../dao/user.dao';
import { User } from '../../schema/user.schema';

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) {}

  async findByAccount(account: string): Promise<User | null> {
    return this.userDao.find({ account });
  }
}
