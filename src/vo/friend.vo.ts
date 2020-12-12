import { Friend } from '../schema/friend.schema';
import { Pig } from '../schema/pig.schema';

export class FriendVo extends Friend {
  readonly targetPig: Pig;
}
