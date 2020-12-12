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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AUTH_JWT } from '../constant/strategy.const';
import { User } from '../decorator/user.decorator';
import { AuthLoginDto, AuthRegisterDto } from '../dto/auth.dto';
import { AuthService } from '../service/auth/auth.service';
import { AuthLoginVo, AuthUser } from '../vo/auth.vo';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: AuthLoginDto): Promise<AuthLoginVo> {
    return this.authService.login(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() body: AuthRegisterDto): Promise<void> {
    await this.authService.register(body);
  }

  @UseGuards(AuthGuard(AUTH_JWT))
  @Get('user')
  profile(@User() user: AuthUser): AuthUser {
    return user;
  }
}
