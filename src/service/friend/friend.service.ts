import { BadRequestException, Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { FilterQuery } from 'mongoose';
import { FriendDao } from '../../dao/friend.dao';
import { FriendAddDto } from '../../dto/friend.dto';
import { Friend, FRIEND_STATE } from '../../schema/friend.schema';
import { makeId } from '../../util/util';
import {
  FriendReadyConfirmVo,
  FriendSearchVo,
  FriendVo,
} from '../../vo/friend.vo';
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
      state: FRIEND_STATE.INIT,
    });
  }

  async confirm(id: string, pigId: string): Promise<void> {
    const result = await this.friendDao.update(
      {
        _id: id,
        targetPigId: pigId,
        state: FRIEND_STATE.INIT,
      },
      { state: FRIEND_STATE.ACTIVE },
    );
    if (!result) throw new BadRequestException('非法的确认猪友');
  }

  async reject(id: string, pigId: string): Promise<void> {
    const result = await this.friendDao.remove({
      _id: id,
      targetPigId: pigId,
      state: FRIEND_STATE.INIT,
    });
    if (!result) throw new BadRequestException('非法的操作');
  }

  async findAll(
    pigId: string,
    query: { state?: FRIEND_STATE },
  ): Promise<Friend[]> {
    const where: FilterQuery<Friend> = {
      $or: [{ sourcePigId: pigId }, { targetPigId: pigId }],
    };
    if (query.state !== undefined) Object.assign(where, { state: query.state });
    return this.friendDao.findAll(where);
  }

  async findAllVo(
    pigId: string,
    query: { state?: FRIEND_STATE },
  ): Promise<FriendVo[]> {
    const friends = await this.findAll(pigId, query);
    return this.makeVos(pigId, friends);
  }

  async findAllReadyConfirmVo(pigId: string): Promise<FriendReadyConfirmVo[]> {
    const friends = await this.friendDao.findAll({
      targetPigId: pigId,
      state: FRIEND_STATE.INIT,
    });
    return this.makeReadyConfirmVos(friends);
  }

  async makeVos(pigId: string, friends: Friend[]): Promise<FriendVo[]> {
    const sourcePigIds = friends.map((v) => v.sourcePigId);
    const targetPigIds = friends.map((v) => v.targetPigId);
    const pigIds = _.uniq(_.concat(sourcePigIds, targetPigIds));
    if (pigIds.length === 0) return [];
    const pigs = await this.pigService.findAllByIds(pigIds);
    return friends
      .map((friend) => {
        const friendPigId =
          friend.targetPigId === pigId
            ? friend.sourcePigId
            : friend.targetPigId;
        const friendPig = _.find(pigs, { _id: friendPigId });
        if (friendPig == null) return null;
        return Object.assign(friend, { friendPig }) as FriendVo;
      })
      .filter((v) => v != null) as FriendVo[];
  }
  async makeReadyConfirmVos(
    friends: Friend[],
  ): Promise<FriendReadyConfirmVo[]> {
    const sourcePigIds = friends.map((v) => v.sourcePigId);
    if (sourcePigIds.length === 0) return [];
    const pigs = await this.pigService.findAllByIds(sourcePigIds);
    return friends
      .map((friend) => {
        const sourcePig = _.find(pigs, { _id: friend.sourcePigId });
        if (sourcePig == null) return null;
        return Object.assign(friend, { sourcePig }) as FriendReadyConfirmVo;
      })
      .filter((v) => v != null) as FriendReadyConfirmVo[];
  }

  async search(value: string, pigId: string): Promise<FriendSearchVo[]> {
    const res: FriendSearchVo[] = [];
    const myFriends = await this.findAll(pigId, {});
    const pigs = await this.pigService.searchBySidOrName(value, [pigId]);
    for (const pig of pigs) {
      const myFriend = _.find(myFriends, (friend) =>
        [friend.sourcePigId, friend.targetPigId].includes(pig._id),
      );
      res.push({ pig, state: myFriend?.state || null });
    }
    return res;
  }

  async delete(id: string, pigId: string): Promise<void> {
    const result = await this.friendDao.remove({
      _id: id,
      $or: [{ sourcePigId: pigId }, { targetPigId: pigId }],
      state: FRIEND_STATE.ACTIVE,
    });
    if (!result) throw new BadRequestException('非法的操作');
  }
}
