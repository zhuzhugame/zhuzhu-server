import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';
import { DATABASE_CONN } from '../constant/provider.const';
import { Friend, FriendDocument, FriendSchema } from '../schema/friend.schema';
import { BaseDao } from './base.dao';

@Injectable()
export class FriendDao extends BaseDao<Friend, FriendDocument> {
  constructor(@Inject(DATABASE_CONN) private conn: Connection) {
    super();
    this.model = conn.model<FriendDocument>('Friend', FriendSchema);
  }
}
