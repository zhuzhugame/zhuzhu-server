import { Module, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CONFIG } from '../config';
import { AuthService } from '../service/auth/auth.service';
import { JwtStrategy } from '../service/auth/jwt.strategy';
import { EquipmentService } from '../service/equipment/equipment.service';
import { FightService } from '../service/fight/fight.service';
import { FriendService } from '../service/friend/friend.service';
import { PigService } from '../service/pig/pig.service';
import { PigEquipmentService } from '../service/pig/pigEquipment.service';
import { UserService } from '../service/user/user.service';
import { DaoModule } from './dao.module';

const providers: Provider[] = [
  AuthService,
  UserService,
  PigService,
  FriendService,
  FightService,
  EquipmentService,
  PigEquipmentService,
];
providers.push(JwtStrategy);

@Module({
  imports: [
    DaoModule,
    PassportModule,
    JwtModule.register({
      secret: CONFIG.JWT_SECRET,
    }),
  ],
  providers,
  exports: providers,
})
export class ServiceModule {}
