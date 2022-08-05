import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/modules/user/user.dto';
import { UserService } from 'src/modules/user/user.service';
import { forbidden } from '../utils';
import { jwtConstants } from './auth.constants';
import { JwtTokens, TokenPayload } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,

    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async signUser(userId: string, login: string): Promise<JwtTokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { userId, login },
        {
          secret: jwtConstants.access_key,
          expiresIn: jwtConstants.access_expiry,
        },
      ),
      this.jwtService.signAsync(
        { userId, login },
        {
          secret: jwtConstants.refresh_key,
          expiresIn: jwtConstants.refresh_expiry,
        },
      ),
    ]);
    return { accessToken, refreshToken };
  }

  async signup(dto: CreateUserDto): Promise<JwtTokens> {
    const user = await this.userService.create(dto);
    const tokens = await this.signUser(user.id, user.login);
    await this.userService.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async login(dto: CreateUserDto): Promise<JwtTokens> {
    const user = await this.userService.match(dto);
    if (!user) forbidden('Invalid login or password');
    const tokens = await this.signUser(user.id, user.login);
    await this.userService.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async refresh(refreshToken: string): Promise<JwtTokens> {
    let payload;
    try {
      payload = this.jwtService.decode(refreshToken) as TokenPayload;
    } catch {};
    
    if (!payload) forbidden();
    const isValid = await this.jwtService.verifyAsync(refreshToken, {
      secret: jwtConstants.refresh_key,
    });
    if (!isValid) forbidden();

    const user = await this.userService.findOne(payload.userId);
    const tokens = await this.signUser(user.id, user.login);
    await this.userService.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
