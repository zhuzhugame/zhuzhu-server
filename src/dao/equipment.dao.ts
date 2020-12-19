import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';
import { DATABASE_CONN } from '../constant/provider.const';
import {
  Equipment,
  EquipmentDocument,
  EquipmentSchema,
} from '../schema/equipment.schema';
import { BaseDao } from './base.dao';

@Injectable()
export class EquipmentDao extends BaseDao<Equipment, EquipmentDocument> {
  constructor(@Inject(DATABASE_CONN) private conn: Connection) {
    super();
    this.model = conn.model<EquipmentDocument>('Equipment', EquipmentSchema);
  }
}
