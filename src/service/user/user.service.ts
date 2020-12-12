import { Injectable } from '@nestjs/common';
import { UserDao } from '../../dao/user.dao';
import { UserCreateDto } from '../../dto/user.dto';
import { User } from '../../schema/user.schema';
import { makeId } from '../../util/util';

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) {}

  async findByAccount(account: string): Promise<User | null> {
    return this.userDao.find({ account });
  }

  async create(dto: UserCreateDto): Promise<User> {
    return this.userDao.create(Object.assign(dto, { _id: makeId() }));
  }
}
