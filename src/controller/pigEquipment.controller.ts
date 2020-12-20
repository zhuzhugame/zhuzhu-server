import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AUTH_JWT } from '../constant/strategy.const';
import { User } from '../decorator/user.decorator';
import { PigEquipmentService } from '../service/pig/pigEquipment.service';
import { AuthUser } from '../vo/auth.vo';
import { PigEquipmentVo } from '../vo/pigEquipment.vo';

@ApiTags('pig equipment')
@ApiBearerAuth()
@UseGuards(AuthGuard(AUTH_JWT))
@Controller()
export class PigEquipmentController {
  constructor(private readonly pigEquipmentService: PigEquipmentService) {}

  @Get('pigs/me/equipments')
  async findAll(@User() user: AuthUser): Promise<PigEquipmentVo[]> {
    return this.pigEquipmentService.findAllVos(user.pigId);
  }

  @Post('pig_equipments/:id/wear')
  async wear(@Param('id') id: string, @User() user: AuthUser): Promise<void> {
    return this.pigEquipmentService.wear(id, user.pigId);
  }

  @Post('pig_equipments/:id/unwear')
  async unwear(@Param('id') id: string, @User() user: AuthUser): Promise<void> {
    return this.pigEquipmentService.unwear(id, user.pigId);
  }

  @Post('pig_equipments/:id/refine')
  async refine(
    @Param('id') id: string,
    @User() user: AuthUser,
  ): Promise<{ result: string }> {
    return this.pigEquipmentService.refine(id, user.pigId);
  }
}
