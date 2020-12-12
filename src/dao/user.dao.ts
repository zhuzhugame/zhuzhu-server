import { Inject, Injectable } from '@nestjs/common';
import { Connection, FilterQuery } from 'mongoose';
import { DATABASE_CONN } from '../constant/provider.const';
import { User, UserDocument, UserSchema } from '../schema/user.schema';

@Injectable()
export class UserDao {
  constructor(@Inject(DATABASE_CONN) private conn: Connection) {}

  async find(conditions: FilterQuery<UserDocument>): Promise<User | null> {
    const user = await this.conn
      .model<UserDocument>('User', UserSchema)
      .findOne(conditions);
    if (user == null) return user;
    return user.toObject();
  }
}
