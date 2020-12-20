import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AUTH_JWT } from '../constant/strategy.const';
import { User } from '../decorator/user.decorator';
import { Pig } from '../schema/pig.schema';
import { PigService } from '../service/pig/pig.service';
import { AuthUser } from '../vo/auth.vo';

@ApiTags('pig')
@ApiBearerAuth()
@UseGuards(AuthGuard(AUTH_JWT))
@Controller('pigs')
export class PigController {
  constructor(private readonly pigService: PigService) {}

  @Get('search')
  async search(
    @Query('value') value: string,
    @User() user: AuthUser,
  ): Promise<Pig[]> {
    return this.pigService.searchBySidOrName(value, [user.pigId]);
  }

  @Get('my')
  async getMy(@User() user: AuthUser): Promise<Pig> {
    return this.pigService.findVoByUserIdOrThrow(user.userId);
  }
}
