import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, UserDto } from 'src/modules/user/user.dto';
import { UserService } from 'src/modules/user/user.service';
import { forbidden } from '../utils';
import { jwtConstants } from './auth.constants';
import { JwtTokens } from './auth.types';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,

    @Inject(forwardRef(() => UserService))
    private userService: UserService,    
  ) {}

  async signUser(userId: string, login: string): Promise<JwtTokens> {
    const [access, refresh] = await Promise.all([
      this.jwtService.signAsync(
        { userId, login }, 
        { secret: jwtConstants.access_key,  expiresIn: jwtConstants.access_expiry }),
      this.jwtService.signAsync(
        { userId, login }, 
        { secret: jwtConstants.refresh_key, expiresIn: jwtConstants.refresh_expiry }),
    ]);
    return { access, refresh };
  }
  
  async signup(dto: CreateUserDto): Promise<JwtTokens> {
    const user = await this.userService.create(dto);
    return {
      access: '',
      refresh: '',
    }
  }

  async login(dto: CreateUserDto): Promise<any> {
    const user = await this.userService.match(dto);
    if (!user) forbidden('Invalid login or password');
    const payload = { userId: user.id, login: user.login };
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
  
}
