import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';
import { DATABASE_CONN } from '../constant/provider.const';
import {
  FightArchive,
  FightArchiveDocument,
  FightArchiveSchema,
} from '../schema/fightArchive.schema';
import { BaseDao } from './base.dao';

@Injectable()
export class FightArchiveDao extends BaseDao<
  FightArchive,
  FightArchiveDocument
> {
  constructor(@Inject(DATABASE_CONN) private conn: Connection) {
    super();
    this.model = conn.model<FightArchiveDocument>(
      'FightArchive',
      FightArchiveSchema,
    );
  }
}
