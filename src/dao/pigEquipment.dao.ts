import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';
import { DATABASE_CONN } from '../constant/provider.const';
import {
  PigEquipment,
  PigEquipmentDocument,
  PigEquipmentSchema,
} from '../schema/pigEquipment.schema';
import { BaseDao } from './base.dao';

@Injectable()
export class PigEquipmentDao extends BaseDao<
  PigEquipment,
  PigEquipmentDocument
> {
  constructor(@Inject(DATABASE_CONN) private conn: Connection) {
    super();
    this.model = conn.model<PigEquipmentDocument>(
      'PigEquipment',
      PigEquipmentSchema,
    );
  }
}
