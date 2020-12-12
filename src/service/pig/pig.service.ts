import { Injectable, NotFoundException } from '@nestjs/common';
import { PigDao } from '../../dao/pig.dao';
import { PigCreateDto } from '../../dto/pig.dto';
import { Pig } from '../../schema/pig.schema';

@Injectable()
export class PigService {
  constructor(private readonly pigDao: PigDao) { }

  async create(dto: PigCreateDto, userId: string): Promise<Pig> {
    return this.pigDao.create(Object.assign(dto, { userId }));
  }

  async findByUserId(userId: string): Promise<Pig | null> {
    return this.pigDao.find({ userId });
  }

  async findByUserIdOrThrow(userId: string): Promise<Pig> {
    const pig = await this.findByUserId(userId);
    if (pig == null) throw new NotFoundException();
    return pig;
  }
}
