import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AUTH_JWT } from '../constant/strategy.const';
import { User } from '../decorator/user.decorator';
import { FriendAddDto } from '../dto/friend.dto';
import { Friend, FRIEND_STATE } from '../schema/friend.schema';
import { FriendService } from '../service/friend/friend.service';
import { AuthUser } from '../vo/auth.vo';
import {
  FriendReadyConfirmVo,
  FriendSearchVo,
  FriendVo,
} from '../vo/friend.vo';

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

  @Post(':id/confirm')
  async confirm(
    @Param('id') id: string,
    @User() user: AuthUser,
  ): Promise<void> {
    return this.friendService.confirm(id, user.pigId);
  }

  @Post(':id/reject')
  async reject(@Param('id') id: string, @User() user: AuthUser): Promise<void> {
    return this.friendService.reject(id, user.pigId);
  }

  @Get()
  async findAll(@User() user: AuthUser): Promise<FriendVo[]> {
    return this.friendService.findAllVo(user.pigId, {
      state: FRIEND_STATE.ACTIVE,
    });
  }

  @Get('ready_confirm')
  async findAllReadyConfirm(
    @User() user: AuthUser,
  ): Promise<FriendReadyConfirmVo[]> {
    return this.friendService.findAllReadyConfirmVo(user.pigId);
  }

  @Get('search')
  async search(
    @Query('value') value: string,
    @User() user: AuthUser,
  ): Promise<FriendSearchVo[]> {
    return this.friendService.search(value, user.pigId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @User() user: AuthUser): Promise<void> {
    return this.friendService.delete(id, user.pigId);
  }
}
