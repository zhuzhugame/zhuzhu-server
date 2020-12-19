import { Module } from '@nestjs/common';
import { AuthController } from '../controller/auth.controller';
import { EquipmentController } from '../controller/equipment.controller';
import { FightController } from '../controller/fight.controller';
import { FriendController } from '../controller/friend.controller';
import { PigController } from '../controller/pig.controller';
import { ServiceModule } from './service.module';

@Module({
  imports: [ServiceModule],
  controllers: [
    AuthController,
    FriendController,
    PigController,
    FightController,
    EquipmentController,
  ],
})
export class ControllerModule {}
