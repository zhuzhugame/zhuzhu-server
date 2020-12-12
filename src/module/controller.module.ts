import { Module } from '@nestjs/common';
import { AuthController } from '../controller/auth.controller';
import { ServiceModule } from './service.module';

@Module({
  imports: [ServiceModule],
  controllers: [AuthController],
})
export class ControllerModule {}
