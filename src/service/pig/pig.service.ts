import { Injectable, NotFoundException } from '@nestjs/common';
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
      Object.assign(dto, { userId, shortId: makeShortId(), _id: makeId() }),
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

  async searchBySidOrName(value: string, excludePigId: string): Promise<Pig[]> {
    return this.pigDao.findAll(
      {
        $or: [{ shortId: value }, { name: { $regex: value } }],
        _id: { $ne: excludePigId },
      },
      { limit: 20 },
    );
  }
}
