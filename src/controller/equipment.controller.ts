import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AUTH_JWT } from '../constant/strategy.const';
import { Equipment } from '../schema/equipment.schema';
import { EquipmentService } from '../service/equipment/equipment.service';

@ApiTags('equipment')
@ApiBearerAuth()
@UseGuards(AuthGuard(AUTH_JWT))
@Controller('equipments')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Get()
  async findAll(): Promise<Equipment[]> {
    return this.equipmentService.findAll();
  }
}
