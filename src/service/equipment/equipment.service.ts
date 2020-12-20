import { Injectable } from '@nestjs/common';
import { EquipmentDao } from '../../dao/equipment.dao';
import { Equipment } from '../../schema/equipment.schema';

@Injectable()
export class EquipmentService {
  constructor(private readonly equipmentDao: EquipmentDao) {}

  async findAll(): Promise<Equipment[]> {
    return this.equipmentDao.findAll({});
  }

  async findAllSale(): Promise<Equipment[]> {
    return this.equipmentDao.findAll({ sale: true });
  }

  async findAllByIds(ids: string[]): Promise<Equipment[]> {
    if (ids.length === 0) return [];
    return this.equipmentDao.findAll({
      sale: true,
      _id: {
        $in: ids,
      },
    });
  }

  async findSale(id: string): Promise<Equipment | null> {
    return this.equipmentDao.find({ sale: true, _id: id });
  }

  async calcEndMoney(equipment: Equipment) {
    return equipment.baseMoney;
  }
}
