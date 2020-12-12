import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';
import { DATABASE_CONN } from '../constant/provider.const';
import { Fight, FightDocument, FightSchema } from '../schema/fight.schema';
import { BaseDao } from './base.dao';

@Injectable()
export class FightDao extends BaseDao<Fight, FightDocument> {
  constructor(@Inject(DATABASE_CONN) private conn: Connection) {
    super();
    this.model = conn.model<FightDocument>('Fight', FightSchema);
  }
}
