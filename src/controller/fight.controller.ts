import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AUTH_JWT } from '../constant/strategy.const';
import { User } from '../decorator/user.decorator';
import { FightSaveDto } from '../dto/fight.dto';
import { FightService } from '../service/fight/fight.service';
import { AuthUser } from '../vo/auth.vo';
import { FightStatVo } from '../vo/fight.vo';

@ApiTags('fight')
@ApiBearerAuth()
@UseGuards(AuthGuard(AUTH_JWT))
@Controller('fights')
export class FightController {
  constructor(private readonly fightService: FightService) {}

  @Get('stat')
  async stat(@User() user: AuthUser): Promise<FightStatVo> {
    return this.fightService.stat(user.pigId);
  }

  @ApiOperation({ description: '匹配开始一场战斗' })
  @HttpCode(HttpStatus.OK)
  @Post('start')
  async start(@User() user: AuthUser): Promise<void> {
    return this.fightService.start(
      user.pigId,
      '65d3c56414ee2f980eb3ce2f71bb0b4f',
    );
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
