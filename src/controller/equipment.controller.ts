import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AUTH_JWT } from '../constant/strategy.const';
import { User } from '../decorator/user.decorator';
import { Equipment } from '../schema/equipment.schema';
import { EquipmentService } from '../service/equipment/equipment.service';
import { PigEquipmentService } from '../service/pig/pigEquipment.service';
import { AuthUser } from '../vo/auth.vo';

@ApiTags('equipment')
@ApiBearerAuth()
@UseGuards(AuthGuard(AUTH_JWT))
@Controller('equipments')
export class EquipmentController {
  constructor(
    private readonly equipmentService: EquipmentService,
    private readonly pigEquipmentService: PigEquipmentService,
  ) {}

  @Get('sale')
  async findAllSale(): Promise<Equipment[]> {
    return this.equipmentService.findAllSale();
  }

  @Post(':id/buy')
  async buy(
    @Param('id') id: string,
    @Body('count') count: number,
    @User() user: AuthUser,
  ): Promise<void> {
    return this.pigEquipmentService.buy(id, count, user.pigId);
  }
}
