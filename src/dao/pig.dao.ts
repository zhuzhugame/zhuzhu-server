import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';
import { DATABASE_CONN } from '../constant/provider.const';
import { Pig, PigDocument, PigSchema } from '../schema/pig.schema';
import { BaseDao } from './base.dao';

@Injectable()
export class PigDao extends BaseDao<Pig, PigDocument> {
  constructor(@Inject(DATABASE_CONN) private conn: Connection) {
    super();
    this.model = conn.model<PigDocument>('Pig', PigSchema);
  }
}
