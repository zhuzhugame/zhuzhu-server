import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AUTH_JWT } from '../constant/strategy.const';
import { User } from '../decorator/user.decorator';
import { FriendAddDto } from '../dto/friend.dto';
import { Friend } from '../schema/friend.schema';
import { FriendService } from '../service/friend/friend.service';
import { AuthUser } from '../vo/auth.vo';

@ApiTags('friend')
@ApiBearerAuth()
@UseGuards(AuthGuard(AUTH_JWT))
@Controller('friends')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post()
  async create(
    @Body() body: FriendAddDto,
    @User() user: AuthUser,
  ): Promise<Friend> {
    return this.friendService.create(body, user.pigId);
  }

  @Get()
  async findAll(@User() user: AuthUser): Promise<Friend[]> {
    return this.friendService.findAllVo(user.pigId);
  }
}
