import { Injectable } from '@nestjs/common';
import { EquipmentDao } from '../../dao/equipment.dao';
import { Equipment } from '../../schema/equipment.schema';

@Injectable()
export class EquipmentService {
  constructor(private readonly equipmentDao: EquipmentDao) {}

  async findAll(): Promise<Equipment[]> {
    return this.equipmentDao.findAll({});
  }
}
