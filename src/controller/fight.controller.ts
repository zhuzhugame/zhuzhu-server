import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AUTH_JWT } from '../constant/strategy.const';
import { User } from '../decorator/user.decorator';
import { FightSaveDto, FightStartDto } from '../dto/fight.dto';
import { FightService } from '../service/fight/fight.service';
import { AuthUser } from '../vo/auth.vo';

@ApiTags('fight')
@ApiBearerAuth()
@UseGuards(AuthGuard(AUTH_JWT))
@Controller('fights')
export class FightController {
  constructor(private readonly fightService: FightService) {}

  @HttpCode(HttpStatus.OK)
  @Post('start')
  async start(
    @Body() body: FightStartDto,
    @User() user: AuthUser,
  ): Promise<void> {
    return this.fightService.start(user.pigId, body.enemyPigId);
  }

  @HttpCode(HttpStatus.OK)
  @Post('save')
  async save(
    @Body() body: FightSaveDto,
    @User() user: AuthUser,
  ): Promise<void> {
    return this.fightService.save(user.pigId, body.newProcess);
  }

  @HttpCode(HttpStatus.OK)
  @Post('end')
  async end(@Body() body: FightSaveDto, @User() user: AuthUser): Promise<void> {
    return this.fightService.end(user.pigId, body.newProcess);
  }
}
