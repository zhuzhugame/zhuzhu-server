import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CONFIG } from '../../config';
import { AuthLoginDto } from '../../dto/auth.dto';
import { AuthLoginVo } from '../../vo/auth.vo';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto): Promise<AuthLoginVo> {
    const user = await this.userService.findByAccount(authLoginDto.account);
    if (user && user.password === authLoginDto.passowrd) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return {
        accessToken: this.jwtService.sign(
          {
            sub: user._id,
            pigId: 'zhuzhu',
          },
          {
            secret: CONFIG.JWT_SECRET,
            expiresIn: '5d',
            audience: 'zhuzhu',
            issuer: 'zhuzhu',
            privateKey: CONFIG.PRIVATE_KEY,
          },
        ),
      };
    }
    throw new UnauthorizedException();
  }
}
