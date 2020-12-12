import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CONFIG } from '../../config';
import { AuthLoginDto, AuthRegisterDto } from '../../dto/auth.dto';
import { AuthLoginVo } from '../../vo/auth.vo';
import { PigService } from '../pig/pig.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly pigService: PigService,
  ) {}

  async login(authLoginDto: AuthLoginDto): Promise<AuthLoginVo> {
    const user = await this.userService.findByAccount(authLoginDto.account);
    if (user && user.password === authLoginDto.password) {
      const pig = await this.pigService.findByUserIdOrThrow(user._id);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return {
        accessToken: this.jwtService.sign(
          {
            sub: user._id,
            pigId: pig._id,
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

  async register(dto: AuthRegisterDto): Promise<void> {
    const user = await this.userService.create({
      account: dto.account,
      password: dto.password,
    });
    await this.pigService.create(
      {
        name: dto.name,
        health: 50,
        simple: 50,
        fat: 50,
        clean: 50,
        solid: 50,
        power: 50,
      },
      user._id,
    );
  }
}
