import { Module } from '@nestjs/common';
import { AuthController } from '../controller/auth.controller';
import { FriendController } from '../controller/friend.controller';
import { PigController } from '../controller/pig.controller';
import { ServiceModule } from './service.module';

@Module({
  imports: [ServiceModule],
  controllers: [AuthController, FriendController, PigController],
})
export class ControllerModule {}
