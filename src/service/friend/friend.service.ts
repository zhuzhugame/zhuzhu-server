import { BadRequestException, Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { FriendDao } from '../../dao/friend.dao';
import { FriendAddDto } from '../../dto/friend.dto';
import { Friend } from '../../schema/friend.schema';
import { makeId } from '../../util/util';
import { FriendVo } from '../../vo/friend.vo';
import { PigService } from '../pig/pig.service';

@Injectable()
export class FriendService {
  constructor(
    private readonly friendDao: FriendDao,
    private readonly pigService: PigService,
  ) {}

  async create(dto: FriendAddDto, pigId: string): Promise<Friend> {
    if (pigId === dto.targetPigId) throw new BadRequestException();
    return this.friendDao.create({
      _id: makeId(),
      sourcePigId: pigId,
      targetPigId: dto.targetPigId,
    });
  }

  async findAll(pigId: string): Promise<Friend[]> {
    return this.friendDao.findAll({
      $or: [{ sourcePigId: pigId }, { targetPigId: pigId }],
    });
  }

  async findAllVo(pigId: string): Promise<FriendVo[]> {
    const friends = await this.findAll(pigId);
    return this.makeVos(friends);
  }

  async makeVos(friends: Friend[]): Promise<FriendVo[]> {
    const targetPigIds = friends.map((v) => v.targetPigId);
    if (targetPigIds.length === 0) return [];
    const pigs = await this.pigService.findAllByIds(targetPigIds);
    return friends
      .map((friend) => {
        const targetPig = _.find(pigs, { _id: friend.targetPigId });
        if (targetPig == null) return null;
        return Object.assign(friend, { targetPig }) as FriendVo;
      })
      .filter((v) => v != null) as FriendVo[];
  }
}
