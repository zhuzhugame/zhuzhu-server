import { Module } from '@nestjs/common';
import { EquipmentDao } from '../dao/equipment.dao';
import { FightDao } from '../dao/fight.dao';
import { FightArchiveDao } from '../dao/fightArchive.dao';
import { FriendDao } from '../dao/friend.dao';
import { PigDao } from '../dao/pig.dao';
import { PigEquipmentDao } from '../dao/pigEquipment.dao';
import { UserDao } from '../dao/user.dao';
import { DatabaseModule } from '../provider/mongodb/mongodb.module';

const providers = [
  UserDao,
  PigDao,
  FriendDao,
  FightDao,
  FightArchiveDao,
  EquipmentDao,
  PigEquipmentDao,
];

@Module({
  imports: [DatabaseModule],
  providers,
  exports: providers,
})
export class DaoModule {}
