import { ApiProperty } from '@nestjs/swagger';
import { Friend, FRIEND_STATE } from '../schema/friend.schema';
import { Pig } from '../schema/pig.schema';

export class FriendVo extends Friend {
  readonly friendPig: Pig;
}

export class FriendReadyConfirmVo extends Friend {
  readonly sourcePig: Pig;
}

export class FriendSearchVo {
  readonly pig: Pig;
  @ApiProperty({ type: String, enum: FRIEND_STATE })
  readonly state: FRIEND_STATE | null;
}
