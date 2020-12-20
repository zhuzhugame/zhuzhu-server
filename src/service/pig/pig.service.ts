import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as _ from 'lodash';
import { PigDao } from '../../dao/pig.dao';
import { PigCreateDto } from '../../dto/pig.dto';
import { Pig } from '../../schema/pig.schema';
import { makeId, makeShortId } from '../../util/util';

@Injectable()
export class PigService {
  constructor(private readonly pigDao: PigDao) {}

  async create(dto: PigCreateDto, userId: string): Promise<Pig> {
    return this.pigDao.create(
      Object.assign(dto, {
        userId,
        shortId: makeShortId(),
        _id: makeId(),
        money: 0,
      }),
    );
  }

  async findByUserId(userId: string): Promise<Pig | null> {
    return this.pigDao.find({ userId });
  }

  async findByUserIdOrThrow(userId: string): Promise<Pig> {
    const pig = await this.findByUserId(userId);
    if (pig == null) throw new NotFoundException();
    return pig;
  }

  async findAllByIds(ids: string[]): Promise<Pig[]> {
    if (_.isEmpty(ids)) return [];
    return this.pigDao.findAll({ _id: { $in: ids } });
  }

  async searchBySidOrName(
    value: string,
    excludePigIds: string[],
  ): Promise<Pig[]> {
    return this.pigDao.findAll(
      {
        $or: [{ shortId: value }, { name: { $regex: value } }],
        _id: { $nin: excludePigIds },
      },
      { limit: 20 },
    );
  }

  async findByIdOrThrow(pigId: string): Promise<Pig> {
    const pig = await this.pigDao.find({ _id: pigId });
    if (pig == null) throw new NotFoundException();
    return pig;
  }

  // TODO: 锁
  async subtractMoney(value: number, pigId: string): Promise<void> {
    const pig = await this.findByIdOrThrow(pigId);
    const endMoney = pig.money - value;
    if (endMoney < 0) throw new BadRequestException('钱不够');
    await this.pigDao.update({ _id: pigId }, { money: endMoney });
  }
}
