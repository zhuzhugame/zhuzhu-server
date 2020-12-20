import { BadRequestException, Injectable } from '@nestjs/common';
import { PigEquipmentDao } from '../../dao/pigEquipment.dao';
import { Equipment } from '../../schema/equipment.schema';
import { PigEquipment } from '../../schema/pigEquipment.schema';
import { makeId } from '../../util/util';
import { PigEquipmentVo } from '../../vo/pigEquipment.vo';
import { EquipmentService } from '../equipment/equipment.service';
import { PigService } from './pig.service';
import * as _ from 'lodash';

@Injectable()
export class PigEquipmentService {
  constructor(
    private readonly pigEquipmentDao: PigEquipmentDao,
    private readonly equipmentService: EquipmentService,
    private readonly pigService: PigService,
  ) { }

  async findAll(pigId: string): Promise<PigEquipment[]> {
    return this.pigEquipmentDao.findAll({
      pigId,
    });
  }

  async findAllVos(pigId: string): Promise<PigEquipmentVo[]> {
    const pigEquipments = await this.findAll(pigId);
    return this.makeVos(pigEquipments);
  }

  async makeVos(pigEquipments: PigEquipment[]): Promise<PigEquipmentVo[]> {
    const equipmentIds = pigEquipments.map((v) => v.equipmentId);
    if (equipmentIds.length === 0) return [];
    const equipments = await this.equipmentService.findAllByIds(
      _.uniq(equipmentIds),
    );
    const vos: PigEquipmentVo[] = [];
    pigEquipments.forEach((pigEquipment) => {
      const equipment = _.find(equipments, { _id: pigEquipment.equipmentId });
      if (equipment == null) return null;
      vos.push(Object.assign(pigEquipment, { equipment }));
    });
    return vos;
  }

  async buy(equipmentId: string, count: number, pigId: string): Promise<void> {
    const equipment = await this.equipmentService.findSale(equipmentId);
    if (equipment == null) throw new BadRequestException('商品已下架');
    const endMoney = await this.equipmentService.calcEndMoney(equipment);
    await this.pigService.subtractMoney(endMoney * count, pigId);
    for (let i = 1; i <= count; i++) {
      await this.add(equipment, pigId);
    }
  }

  private async add(
    equipment: Equipment,
    pigId: string,
  ): Promise<PigEquipment> {
    return this.pigEquipmentDao.create({
      _id: makeId(),
      pigId,
      equipmentId: equipment._id,
      carrying: false,
      refineLv: 0,
      strongLv: 0,
    });
  }

  async wear(id: string, pigId: string): Promise<void> {
    await this.pigEquipmentDao.update(
      {
        pigId,
        carrying: true,
      },
      {
        carrying: false,
      },
    );
    await this.pigEquipmentDao.update(
      {
        _id: id,
        pigId,
        carrying: false,
      },
      {
        carrying: true,
      },
    );
  }

  async unwear(id: string, pigId: string): Promise<void> {
    await this.pigEquipmentDao.update(
      {
        _id: id,
        pigId,
        carrying: true,
      },
      {
        carrying: false,
      },
    );
  }
}
