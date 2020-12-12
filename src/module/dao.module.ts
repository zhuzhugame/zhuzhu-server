import { Module } from '@nestjs/common';
import { PigDao } from '../dao/pig.dao';
import { UserDao } from '../dao/user.dao';
import { DatabaseModule } from '../provider/mongodb/mongodb.module';

const providers = [UserDao, PigDao];

@Module({
  imports: [DatabaseModule],
  providers,
  exports: providers,
})
export class DaoModule {}
